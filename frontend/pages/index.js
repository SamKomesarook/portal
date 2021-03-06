import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql, useMutation } from "@apollo/client";
import client from "../apollo-client";
import React, { useState } from 'react';
import jsPDF from "jspdf";

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
            dropdownValues {
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

const POST_RESULT = gql`
      mutation PostResults($results: String!) {
        postResults(results: $results) {
          status
        }
      }
    `;

export default function Home({ status, forms }) {

  const [fields, setFields] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [postResults, { data }] = useMutation(POST_RESULT);
  const [selectedForm, setSelectedForm] = useState(0)

  const submit = () => {
    postResults({ variables: { results: JSON.stringify(fields)} });
    print();
    setSubmitted(true);
  }


  const print = () => {
    const doc = new jsPDF();
    let str = "";
    for (const [key, value] of Object.entries(fields)) {
      str += key + " : " + value + '\n'
    }
    doc.text(str, 10, 10);
    doc.save("a4.pdf");
  };

  const renderField = (field) => {
    // Create a rule dictionary so it's easier to query below.
    let parsedRules = {}
    field.rules && field.rules.map((rule) => {
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
        return (
        <>
        <label>
        {field.name}
        <input style={{marginLeft: '12px'}} value={fields[field.id]} type="number" min={parsedRules['min'] || null } max={parsedRules['max'] || null} onChange={(e) => {
          setFields(prev =>({
            ...prev,
            [field.id] : parseInt(e.target.value)
        }));
        }} />        
        </label>
        <p>{field.desc}</p>
        </>)
      case 'paragraph':
        return (
        <>
        <label>
        {field.name}
        <textarea style={{marginLeft: '12px'}} value={fields[field.id]} min={parsedRules['min'] || null } max={parsedRules['max'] || null} onChange={onChange} />        
        </label>
        <p>{field.desc}</p>
        </>)
      case 'email':
        return (
        <>
        <label>
        {field.name}
        <input type='email' style={{marginLeft: '12px'}} value={fields[field.id]} onChange={onChange} />        
        </label>
        <p>{field.desc}</p>
        </>)
      case 'check':
        return (
        <>
        <label>
        {field.name}
        <input type='checkbox' style={{marginLeft: '12px'}} value={fields[field.id]} onChange={e => {
      setFields(prev =>({
          ...prev,
          [field.id] : e.target.checked
      }));
    }} />        
        </label>
        <p>{field.desc}</p>
        </>)
      case 'select':
        return (
        <>
        <label>
        {field.name}
        <select onChange={e => {
      setFields(prev =>({
          ...prev,
          [field.id] : e.target.value
      }));
    }} style={{marginLeft: '12px'}} name={field.name} id={field.name} form={`form${selectedForm}`}>
          {
            field.dropdownValues.map((elem) => {
                return <option value={elem.key}>{elem.value}</option>})
          }
        </select>       
        </label>
        <p>{field.desc}</p>
        </>)
      default:
        return 
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Console</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the console!
        </h1>

        <p className={styles.description}>
          The status of the server is {status}
        </p>

        <button style={{marginBottom: '12px'}} onClick={() => setSelectedForm(selectedForm == 0 ? 1 : 0)}>Toggle Forms</button>
        
          <form id={`form${selectedForm}`}>
            {forms[selectedForm].fields.map((field => renderField(field)))}
            </form>
        
      {!submitted && <button style={{marginTop: '12px'}} onClick={submit}>Submit</button>}
      {submitted && <button style={{marginTop: '12px'}} onClick={print}>Save</button>}
      </main>
    </div>
  )
}
