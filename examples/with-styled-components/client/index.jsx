import React from 'react';
import { renderToString } from 'react-dom/server';
import styled, { ServerStyleSheet } from 'styled-components';

const sheet = new ServerStyleSheet();

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const App = () => (
  <Wrapper>
    <Title>Hello, this is a styled component!</Title>
  </Wrapper>
);

const html = renderToString(sheet.collectStyles(<App />));
const styleTags = sheet.getStyleTags();

export default () => (
  <html>
    <head>
      <title>With styled component</title>
      <style type="text/css">{styleTags}</style>
    </head>
    <body>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </body>
  </html>
);
