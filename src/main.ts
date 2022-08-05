import * as React from 'react';
import {createRoot} from 'react-dom/client';
import { App } from './app';

function run() {
  const domContainer = document.querySelector('#notes-webapp-react');
  const root = createRoot(domContainer);
  root.render(React.createElement(App));
}

run();