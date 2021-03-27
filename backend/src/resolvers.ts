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
              key: 'bottom',
              value: '0'
            },
            {
              key: 'top',
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