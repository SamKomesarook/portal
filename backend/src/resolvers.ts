const getForms = () => {
  return [
    {
      fields: [
        {
          id: 'handsome',
          name: 'Handsomeness Rating',
          type: 'number',
          desc: 'Describe how handsome Sam is on a scale of 1-10',
          rules: [
            {
              key: 'min',
              value: '0'
            },
            {
              key: 'max',
              value: '10'
            }
          ]
        }
      ]
    }
  ]
}

const handleResults = (results: String) => {
  return true
}

export default {
  Query: {
    status: (): string => 'Okay!',
    getForms: () => getForms()
  },
  Mutation: {
    postResults: (obj: any, args: any) => handleResults(args.results)
  }
}