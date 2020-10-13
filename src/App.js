import React from 'react';

// дефаулт-импорт
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Features from './components/Features/Features'
import Footer from './components/Footer/Footer'
import Calendar from './components/Calendar/Calendar';
import Details from './components/Details/Details'

// импорт стилей
import './style.css';

function App() {
  // в ретурне должен быть только 1 общий родитель иначе будет ошибка
  return (
    // обёртка родитель. Делаем её фрагментом, что бы не отображть ее в конечной верстке как лишний элемент
    // сокращенная версия React.Fragment - пустые скобки <>
    <React.Fragment>
      {/* вставляю импортированный хедер */}
      <Header />
      {/* вставляю импортированный мейн */}
      <Main />
      
      <Features />
      <Footer />
    </React.Fragment>
    
  );
}

export default App;
