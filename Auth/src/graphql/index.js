const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require("graphql");

let notLogged = {
  msg: "Unauthorized",
}

const UserApiType = new GraphQLObjectType({
  name: "UserApiType",
  fields: {
    key: { type: GraphQLString }
  }
})

const LastReqType = new GraphQLObjectType({
  name: "LastReqType",
  fields: {
    to: { type: GraphQLString },
    date: { type: GraphQLString }
  }
})

const RequestsType = new GraphQLObjectType({
  name: "RequestsType",
  fields: {
    last: {
      type: LastReqType,
      resolve(parent, args, req) {
        return req.user ? req.user.requests.last : {...notLogged, logged: req.isAuthenticated()};
      }
    },
    total: { type: GraphQLInt },
    corazon: { type: GraphQLInt },
    fallar: { type: GraphQLInt },
    screenshot: { type: GraphQLInt },
    internet: { type: GraphQLInt },
    obradearte: { type: GraphQLInt },
    turner_web: { type: GraphQLInt },
    triturar: { type: GraphQLInt }
  }
})

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLString },
    avatar: { type: GraphQLString },
    tag: { type: GraphQLString },
    logged: { type: GraphQLBoolean },
    api: {
      type: UserApiType,
      resolve(parent, args, req) {
        return req.user ? req.user.api : {...notLogged, logged: req.isAuthenticated()};
      }
    },
    requests: {
      type: RequestsType,
      resolve(parent, args, req) {
        return req.user ? req.user.requests : {...notLogged, logged: req.isAuthenticated()};
      }
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUser: {
      type: UserType,
      resolve(parent, args, req) {
        return req.user ? req.user : {...notLogged, logged: req.isAuthenticated()};
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery });