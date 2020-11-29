import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from "react-redux";

import { store } from "./redux/store";

import { App } from './components/App';
import { AppInitialiser } from './services/app-initialiser';

import './styles/main.scss';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

AppInitialiser.init();

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  mainElement
);
