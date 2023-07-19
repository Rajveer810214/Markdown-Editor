/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import markdown from '../Image/markdown.png';

function Front() {
  return (
    <div className="front">
      <h1 style={{ textAlign: 'center' }}>Welcome to Markdown Editor</h1>
      <img style={{ width: '100%', opacity: '0.9' }} src={markdown} alt="alt" />
      <p style={{ textAlign: 'center' }}>Start creating beautiful documents with Markdown!</p>

      <Link to="/Markdown">
        <button style={{ margin: 'auto', display: 'block' }}>Get Started</button>
      </Link>

      <a style={{ textAlign: 'center', display: 'block', marginTop: '33px' }} href="https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Howto/Markdown_in_MDN">Learn Markdown</a>
    </div>
  );
}

export default Front;
