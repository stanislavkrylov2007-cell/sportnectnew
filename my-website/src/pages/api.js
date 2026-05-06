import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function API() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js';
    script.onload = () => {
      window.SwaggerUIBundle({
        url: 'https://raw.githubusercontent.com/stanislavkrylov2007-cell/sportnectnew/main/my-website/openapi.yaml',
        dom_id: '#swagger-ui',
        presets: [
          window.SwaggerUIBundle.presets.apis,
          window.SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: 'BaseLayout',
        deepLinking: true,
      });
    };
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist/swagger-ui.css';
    document.head.appendChild(link);
  }, []);

  return (
    <Layout title="API Documentation" description="Sportnect API">
      <div style={{ padding: '20px' }}>
        <div id="swagger-ui" />
      </div>
    </Layout>
  );
}