'use strict';

import React from 'react';

export const View = (props) => {
  const { children, helper } = props;
  return (
    <html>
      <head>
        <title>AntD Components</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/antd@3.2.3/dist/antd.min.css"
        />
        <link rel="stylesheet" href={helper.asset('index.css')} />
      </head>
      <body>
        {children}
        <script src={helper.asset('manifest.js')} />
        <script src={helper.asset('index.js')} />
      </body>
    </html>
  );
};

export const Section = (props) => {
  const { className, children, title } = props;
  return (
    <section className={`section code-box-demo ${className || ''}`}>
      <h3 className="title">{title}</h3>
      {children}
    </section>
  );
};
