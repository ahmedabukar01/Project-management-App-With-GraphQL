// const {projects, clients} = require('../sampleData')
const Client = require('../models/Client');
const Project = require('../models/Project');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLScalarType, GraphQLList} = require('graphql');

// project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        clientId: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId)
            }
        }
    })
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
            type: new GraphQLList(ProjectType),
            resolve(){
                return Project.find()
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                return Project.findById(args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Client.find()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})