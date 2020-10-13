import React from 'react';
// подключаем метод для работы с дом от реакта, подключаем только в индекс-js
import ReactDOM from 'react-dom';

import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  () => {
    console.log('Hello')
  }
);

