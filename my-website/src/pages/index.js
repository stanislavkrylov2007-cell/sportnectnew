import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="Sportnect" description="Техническая документация Sportnect">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem' }}>Техническая документация Sportnect</h1>
        <Link
          to="/docs"
          style={{
            marginTop: '2rem',
            padding: '12px 24px',
            backgroundColor: '#1890ff',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none'
          }}
        >
          Перейти к документации
        </Link>
      </div>
    </Layout>
  );
}