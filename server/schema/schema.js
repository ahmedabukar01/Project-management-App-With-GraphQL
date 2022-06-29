const {projects, clients} = require('../sampleData')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLScalarType, GraphQLList} = require('graphql');

// project Type
const projectType = new GraphQLObjectType({
    name: 'Project',
    fields: {
        id: {type: GraphQLID},
        clientId: {type: GraphQLID},
        email: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString}
    }
})
// client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(projectType),
            resolve(){
                
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return clients
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return clients.find(client => client.id === args.id );
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})