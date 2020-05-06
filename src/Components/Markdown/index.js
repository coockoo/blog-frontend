import React, { Fragment } from 'react';
import marked from 'marked';

import Code from 'Components/Code';

import s from './styles.less';

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
  if (token.type === 'paragraph') {
    return renderParagraph(token, index);
  }
  if (token.type === 'list') {
    return renderList(token, index);
  }
  if (token.type === 'link') {
    return renderLink(token, index);
  }
  if (token.type === 'codespan') {
    return renderCodespan(token, index);
  }
  if (token.type === 'strong') {
    const content = renderTokens(token.tokens);
    return <strong key={index}>{content}</strong>;
  }
  if (token.type === 'em') {
    const content = renderTokens(token.tokens);
    return <em key={index}>{content}</em>;
  }
  if (token.type === 'space') {
    return renderSpace(token, index);
  }
  if (token.type === 'text') {
    return token.text;
  }
  console.error(token);
  throw new Error(`cannot render token "${token.type}"`);
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
  return <Code key={key} lang={token.lang} value={token.text} className={s.code} />;
}

function renderParagraph(token, key) {
  const content = renderTokens(token.tokens);
  return (
    <p key={key} className={s.paragraph}>
      {content}
    </p>
  );
}

function renderList(token, key) {
  const items = token.items.map((item, index) => {
    const content = renderTokens(item.tokens);
    return <li key={index}>{content}</li>;
  });

  if (token.ordered) {
    return <ol key={key}>{items}</ol>;
  }
  return <ul key={key}>{items}</ul>;
}

function renderLink(token, key) {
  const content = token.tokens ? renderTokens(token.tokens) : token.text;
  return (
    <a href={token.href} key={key} className={s.link}>
      {content}
    </a>
  );
}

function renderCodespan(token, key) {
  return (
    <code key={key} className={s.codespan}>
      {token.text}
    </code>
  );
}

function renderSpace(token, key) {
  const range = Array(token.raw.length - 2).fill();

  return (
    <Fragment key={key}>
      {range.map((_, i) => (
        <Fragment key={i}>
          <br />
        </Fragment>
      ))}
    </Fragment>
  );
}

function render(markdown) {
  const tokens = marked.lexer(markdown);
  return renderTokens(tokens);
}

export default function Markdown(props) {
  return <div className={s.root}>{render(props.value)}</div>;
}
