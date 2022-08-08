/* istanbul ignore file */
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import { App } from './app';

function run() {
  const staticPage = document.getElementById('static-page');
  if (staticPage) {
    staticPage.innerHTML = '';
  }
  const domContainer = document.querySelector('#notes-webapp-react');
  const root = createRoot(domContainer);
  root.render(React.createElement(App, {name: 'anonymous'}));
}

run();