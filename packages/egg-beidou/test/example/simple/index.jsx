import 'babel-polyfill';
import React from 'react';

export default class View extends React.Component {
  static doctype = '<!DOCTYPE html>';

  render() {
    return (
      <div>
        <h1>Simple Usage</h1>
        <ul>
          <li>
            <a href="/static">Static Page</a>
          </li>
          <li>
            <a href="/style">Static Styling Page </a>
          </li>
          <li>
            <a href="/script">Page with Script</a>
          </li>
        </ul>
      </div>
    );
  }

  static script(props){
    return "<sript>window.name = hhhh</sript>"
  }
  
}
