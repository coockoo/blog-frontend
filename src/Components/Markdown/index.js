import React, { Fragment } from 'react';
import marked from 'marked';

// import s from './styles.less';

function renderTokens(tokens) {
  return <Fragment>{tokens.map(renderToken)}</Fragment>;
}

function renderToken(token, index) {
  if (token.type === 'heading') {
    return renderHeading(token, index);
  }
  if (token.type === 'text') {
    return token.text;
  }
  console.error(token);
  throw new Error(`cannot render token ${token.type}`);
}

function renderHeading(token, key) {
  const content = renderTokens(token.tokens);

  if (token.depth === 1) {
    return <h1 key={key}>{content}</h1>;
  }
  if (token.depth === 2) {
    return <h2 key={key}>{content}</h2>;
  }
  return <h3 key={key}>{content}</h3>;
}

function render(markdown) {
  const tokens = marked.lexer(markdown);
  return renderTokens(tokens);
}

export default function Markdown(props) {
  console.log(props.value);
  return <div>{render(props.value)}</div>;
}
