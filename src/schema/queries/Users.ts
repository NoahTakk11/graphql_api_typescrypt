
import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";
import { Users } from "../entites/user";
import { UserType } from "../typeDefs/User";

//devolver varios usuarios de la base de datos.
export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve() {

        const result =  await Users.find()
        return result;
    }
}

//devolver un solo usuario de la base de datos.
export const GET_USER = {
    type: UserType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(_: any, args: any) {

        const result =  await Users.findOneBy({id: args.id});
        return result
         
    }
}