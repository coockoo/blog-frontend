import React, { Fragment, useEffect, useRef } from 'react';
import marked from 'marked';
import hljs from 'highlight.js/lib/core';

// import s from './styles.less';

function renderTokens(tokens) {
  if (!tokens) {
    return null;
  }
  return <Fragment>{tokens.map(renderToken)}</Fragment>;
}

function renderToken(token, index) {
  if (token.type === 'heading') {
    return renderHeading(token, index);
  }
  if (token.type === 'code') {
    return renderCode(token, index);
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

function renderCode(token, key) {
  return (
    <pre>
      <code lang={token.lang} key={key}>
        {token.text}
      </code>
    </pre>
  );
}

function render(markdown) {
  const tokens = marked.lexer(markdown);
  return renderTokens(tokens);
}

export default function Markdown(props) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [ref]);

  return <div ref={ref}>{render(props.value)}</div>;
}
