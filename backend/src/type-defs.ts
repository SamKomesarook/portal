import { gql } from 'apollo-server';
// TODO: replace the query rules with a JSON decodable string
export default gql`
  
  type Rule {
    key: String
    value: String
  }

  type Field {
    id: ID!
    name: String!
    type: String!
    desc: String
    rules: [Rule]
  }

  type Form {
    fields: [Field]
  }

  type Query {
    status: String!
    getForms: [Form]
  }

  type Mutation {
    postResults(results: String, formNum: Int): Boolean
  }
`