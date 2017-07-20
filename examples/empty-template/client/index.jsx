import React from 'react';

/**
 * @export
 * @class Index
 * @extends {React.Component}
 */
export default class Index extends React.Component {
  render() {
    const titleStyle = {
      color: 'red',
      textAlign: 'center'
    };
    const textStyle = {
      textAlign: 'center'
    };
    return (
      <div>
        <h1 style={titleStyle} >Hello World, Beidou</h1>
        <div style={textStyle} >you might need 
          <a href="https://github.com/alibaba/beidou" target="_blank" rel="noopener noreferrer" >Beidou document</a>
        </div>
      </div>
    );
  }
}
