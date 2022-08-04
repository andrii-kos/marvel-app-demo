import React from 'react';
import ReactDom from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css'

import './index.css';
import './style/style.scss'
import './style/button.scss'
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root');
ReactDom
  .createRoot(container)
  .render(
    //<React.StrictMode>
      <App />
    //</React.StrictMode>
  )


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
