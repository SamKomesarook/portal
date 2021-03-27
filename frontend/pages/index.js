import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
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
  const [submitted, setSubmitted] = useState(false);

  const colstyle = {
    width: "30%"
  };
  const tableStyle = {
    width: "100%"
  };

  const Prints = () => (
    <div>
      <h3>Time & Materials Statement of Work (SOW)</h3>
      <h4>General Information</h4>
      <table id="tab_customers" class="table table-striped" style={tableStyle}>
        <colgroup>
          <col span="1" style={colstyle} />
          <col span="1" style={colstyle} />
        </colgroup>
        <thead>
          <tr class="warning">
            <th>SOW Creation Date</th>
            <th>SOW Start Date</th>
            <th>Project</th>
            <th>Last Updated</th>
            <th>SOW End Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dec 13, 2017</td>
            <td>Jan 1, 2018</td>
            <td>NM Connect - NMETNMCM</td>
            <td>Dec 13, 2017</td>
            <td>Dec 31, 2018</td>
          </tr>
        </tbody>
      </table>
      <p>
        This is a Time and Materials Statement of Work between Northwestern Mutual
        Life Insurance Company and Infosys with all general terms and conditions
        as described in the current Master Agreement and its related documents
      </p>
    </div>
  );

  const print = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  };

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

      {submitted && <button onClick={print}>Save</button>}

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
