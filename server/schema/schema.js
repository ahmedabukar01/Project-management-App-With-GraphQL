const {projects, clients} = require('../sampleData')

const {GraphQLObjectType, GraphQLID, GraphQLString} = require('graphql');

// client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: Graph},
        phone: {type: GraphQLID},
    })
})