import 'babel-polyfill';
import React from 'react';
import Recursive from './recursive';

export default class View extends React.Component {
  static doctype = '<!DOCTYPE html>';

  render() {
    const { helper, ctx } = this.props;
    const { depth = 3, breadth = 10, repeat = 1 } = ctx.query;
    return (
      <html>
        <head>
          <title>benchmark demo</title>
          <meta viewport="" />
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <div className="demo">
            {[...new Array(parseInt(repeat, 10))].map((v, i) => (
              <Recursive key={i} depth={depth} breadth={breadth} />
            ))}
          </div>
        </body>
      </html>
    );
  }
}
