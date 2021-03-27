import { gql } from 'apollo-server';

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
`