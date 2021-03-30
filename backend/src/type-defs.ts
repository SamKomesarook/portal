import { gql } from 'apollo-server';
// TODO: replace the query rules with a JSON decodable string
export default gql`
  
  type Rule {
    key: String
    value: String
  }

  type DropdownValues {
    key: String
    value: String
  }

  type Field {
    id: ID!
    name: String!
    type: String!
    desc: String
    rules: [Rule]
    dropdownValues: [DropdownValues]
  }

  type Form {
    fields: [Field]
  }

  type Query {
    status: String!
    getForms: [Form]
  }

  type PostResult {
    status: Boolean
  }

  type Mutation {
    postResults(results: String): PostResult
  }
`