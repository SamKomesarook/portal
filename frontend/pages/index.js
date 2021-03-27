import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import React, { useState } from 'react';

export async function getStaticProps() {
  const status = await client.query({
    query: gql`
      query Status {
        status
      }
    `,
  });

 
  const forms = await client.query({
    query: gql`
      query GetForms {
        getForms {
          fields {
            id
            name
            type
            desc
            rules {
              key
              value
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      status: status.data.status,
      forms: forms.data.getForms
    },
 };
}

export default function Home({ status, forms }) {

  const [fields, setFields] = useState({});

  const renderField = (field) => {
    // Create a rule dictionary so it's easier to query below.
    let parsedRules = {}
    field.rules.map((rule) => {
      parsedRules[rule.key] = rule.value
    })
  
    const onChange = e => {
      setFields(prev =>({
          ...prev,
          [field.id] : e.target.value
      }));
    }
  
    switch(field.type){
      case 'number':
        return (<label>
        {field.name}
        <input  value={fields[field.id]} type="number" min={parsedRules['min'] || null } max={parsedRules['max'] || null} onChange={onChange} />        
        </label>)
      default:
        return 
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the console!
        </h1>

        <p className={styles.description}>
          The status of the server is {status}
        </p>

        {
          forms.map((form) => (
            <form>
            {form.fields.map((field => (
              renderField(field)
            )))}
            </form>
          ))
        }

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
