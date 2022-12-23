import {GraphQLSchema, GraphQLObjectType} from 'graphql';
import { GREETING } from './queries/Greeting';
import { CREATE_USER, DELETE_USERS, UPDATE_USER } from './mutations/Users';
import { GET_ALL_USERS, GET_USER } from './queries/Users';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        greeting: GREETING,
        getAllUsers: GET_ALL_USERS,
        getUser: GET_USER
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USERS,
        updateUser: UPDATE_USER
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
    
});