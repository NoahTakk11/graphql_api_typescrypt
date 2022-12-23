
import {GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import { Users } from '../entites/user';
import { UserType } from '../typeDefs/User';
import bcrypt from 'bcryptjs';

export const CREATE_USER = {
    type: UserType,
    args: {
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString}, 
    },

    async resolve(_:any, args:any) {

        const {id, name, username, password} =  args;

        //encriptamos las contaseñas.
        const encrypPassword = await bcrypt.hash(password, 10);

        const result = await Users.insert({
            name: name,
            username: username,
            password: encrypPassword
        });

        //no olvidemos de returnar la contraseña encriptada.
        return {...args, id: result.identifiers[0].id, password: encrypPassword}
    }
};

//creamos la función para eliminar usuarios.
export const DELETE_USERS = {
    type: GraphQLString,
    args: {
        id : {type: GraphQLID}
 
    },

    async resolve(_:any, {id}: any) {
        
        const result = await Users.delete({id})

        if (result.affected! > 0) return 'User has been deleted';

        return 'User not found';
    }
};

export const UPDATE_USER = {
    type: GraphQLString,
    args: {
        id: {type: GraphQLID},
        input : {
            type: new GraphQLInputObjectType({
                name: "UserInput",
                fields: () => ({
                    name: {type: GraphQLString},
                    username: {type: GraphQLString},
                    oldPassword: {type: GraphQLString},
                    newPassword: {type: GraphQLString}
                }),
            }),
        },
        
    },

    async resolve(_:any, {id, input}:any) {

        const userFound = await Users.findOneBy({id});

        if (!userFound) throw new Error('User not found');

        const isMatch = await bcrypt.compare(
            input.oldPassword,
            userFound.password
        );
          

        if (!isMatch) throw new Error('Password does not match');

        const newPassword = await bcrypt.hash(input.newPassword, 10);
        delete input.oldPassword;
        delete input.newPassword;

        input.password = newPassword;

        const response = await Users.update({id}, input);

        if (response.affected === 0) return {message: "User not found"};

        return "Update user successfully";

    }

}