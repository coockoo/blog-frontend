import { render } from 'react-dom';
import * as React from 'react';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

import './global.less';

import App from 'App';

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('javascript', javascript);

render(<App />, document.getElementById('mount'));
