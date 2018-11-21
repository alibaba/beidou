import React from 'react';

export default ({ contacts }) => (
  <div>
    <h2>about</h2>
    <ul>
      {contacts.map(contact => (
        <li>{contact}</li>
      ))}
    </ul>
  </div>
);
