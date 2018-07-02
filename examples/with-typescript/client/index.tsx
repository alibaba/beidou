import React from 'react';

declare interface IViewProps {
  helper?: object;
}

export default class View extends React.Component<IViewProps> {
  render() {
    // const { helper } = this.props;
    return (
      <html>
        <head>
          <title>TypeScript</title>
        </head>
        <body>
          <h1 className="title">TypeScript Page</h1>
          <p>
            Write client app with TypeScript.
          </p>
        </body>
      </html>
    );
  }
}
