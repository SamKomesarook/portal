"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var resolvers_1 = __importDefault(require("./resolvers"));
var type_defs_1 = __importDefault(require("./type-defs"));
var server = new apollo_server_1.ApolloServer({ resolvers: resolvers_1.default, typeDefs: type_defs_1.default });
server.listen().then(function (_a) {
    var url = _a.url;
    return console.log("Server ready at " + url);
});
