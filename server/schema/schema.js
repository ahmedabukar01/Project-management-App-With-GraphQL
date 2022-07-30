
// const {projects, clients} = require('../sampleData')
const Client = require('../models/Client');
const Project = require('../models/Project');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLScalarType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLEnumType} = require('graphql');
const { set } = require('mongoose');

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

// mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add Client
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                // return Client.create(args.name, args.email, args.phone);
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                
                return client.save();
            }
        },

        // delete a client
        deleteCleint: {
            type: ClientType,
            args:{
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return Client.findByIdAndRemove(args.id);
            }
        },

        // ad project
        addProject:{
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            "new": {value: "Not Started"},
                            "progress": {value: "In Progress"},
                            "completed": { value: "Completed"},
                        }
                      
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            },
        },

        // delete project
        deleteProject:{
            name: "deleteProject",
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                return Project.findByIdAndRemove(args.id)
            }
        },

        // Update Project
        updateProject: {
            name: "updateProject",
            type: ProjectType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'in Progress'},
                            completed: {value: 'Completed'},
                        }
                    })
                }

            },
            resolve(parent,args){
                return Project.findByIdAndUpdate(args.id,
                    {
                    $set:{
                    name: args.name,
                    description: args.description,
                    status: args.status
                    }
                }, {new: true})
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})