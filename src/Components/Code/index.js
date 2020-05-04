import React, { useRef, useEffect } from 'react';
import hljs from 'highlight.js/lib/core';

export default function Code(props) {
  const ref = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(ref.current);
  }, [ref, props.value]);

  return (
    <pre>
      <code ref={ref} lang={props.lang}>
        {props.value}
      </code>
    </pre>
  );
}
