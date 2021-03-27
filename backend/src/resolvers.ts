import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


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

const handleResults = async (results: any, formNum: any) => {
  const fields = JSON.parse(results);
  if(formNum == 1){
    await prisma.form1.create({
      data: {
        handsomeRating: fields.handsomeRating,
      },

    })
  }
  return true
}

export default {
  Query: {
    status: (): string => 'Okay!',
    getForms: () => getForms()
  },
  Mutation: {
    postResults: (obj: any, args: any) => handleResults(args.results, args.formNum)
  }
}