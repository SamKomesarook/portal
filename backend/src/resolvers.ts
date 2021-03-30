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
        },
        {
          id: 'email',
          name: 'Email Signup',
          type: 'email',
          desc: 'Enter email to receive updates about Sam\'s beauty routine',
          rules: [
            
          ]
        }
      ]
    },
    {
      fields: [
        {
          id: 'hair',
          name: 'Hair Description',
          type: 'paragraph',
          desc: 'In under 100 characters, describe what Sam\'s hair means to you.',
          rules: [
            {
              key: 'max',
              value: '100'
            }
          ]
        }
      ]
    }
  ]
}

const handleResults = async (results: any, cookies: any) => {
  /*if(cookies.auth !== 'shepherd'){
    return false;
  }*/
  const fields = JSON.parse(results);
  console.log(fields)
  try{
    await prisma.form.create({
      data:   fields
      ,
    })
    return true
  }catch (e){
    console.log(e)
    return false
  }
}

export default {
  Query: {
    status: (): string => 'Okay!',
    getForms: () => getForms()
  },
  Mutation: {
    postResults: (obj: any, args: any, context: any) => handleResults(args.results, context.cookies)
  }
}