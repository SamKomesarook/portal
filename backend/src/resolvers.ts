const getForms = () => {
  return [
    {
      fields: [
        {
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

export default {
  Query: {
    status: (): string => 'Okay!',
    getForms: () => getForms()
  }
}