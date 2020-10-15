import React from 'react';
// подключаем нужные компоненты и методы с реакт-роутер-дом для роутинга
import { BrowserRouter, Route } from 'react-router-dom'

// дефаулт-импорт
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import FetchData from './service/FetchData';

import Calendar from './components/Calendar/Calendar';
import Details from './components/Details/Details';

// импорт стилей
import './style.css';

class App extends React.Component {

  // fetchData - Обьект со всеми свойствами класса FetchData
  fetchData = new FetchData();

  // мишу методы, в сорвеменном деве их можно делать без constructor
  // constructor() {
  //   this.state = state;
  // }
  state = {
    // стейт нельзя менять напрямую, только методами с React.Component (setState)
    rocket: "Falcon 1",
    rocketFeatures: null,
    rockets: [],
    company: null,
  }

  // метод жизненного цикла компонента. Did - работает после рендера, Will - после
  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
  }

  // метод для обновления данных по ракете
  updateRocket() {
    this.fetchData.getRocket()
      .then(data => {
        this.setState( { rockets: data.map(item => item.name) })
        return data
      })
      .then(data => data.find(item => item.name === this.state.rocket))  // ищет ракету с нужным именем
      .then(rocketFeatures => {
        this.setState({ rocketFeatures })
      }); // setState - спец метод для обновления данных
  }

  // метод для смены ракеты на экране
  // стрелочная функция, что бы не привязывать this, в стрелке он будет являться текущим классом
  changeRocket = (rocket)  => {
    this.setState({
      rocket
    }, this.updateRocket);
  }
  
  updateCompany = () => {
    // получаем данные от сервера и с помощью then их обрабатываем
    this.fetchData.getCompany()
      .then(company => this.setState({ company }))
    // указали company, что бы данные записались именно в state => company и не добавились все ненужные свойства в наш стейт
  }


  // в ретурне должен быть только 1 общий родитель иначе будет ошибка
  render() {
    // console.log(this.state)

    return (
      // обёртка родитель. Делаем её фрагментом, что бы не отображть ее в конечной верстке как лишний элемент
      // сокращенная версия React.Fragment - пустые скобки <> позже его заменил на BrowserRoute для слежения
      <BrowserRouter>
        {/* вставляю импортированный файлы с версткой */}
         <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>
        {/* делаем первой отображаемой страницей Home */}
        {/* exact - жесткая привязка к пути в url */}
        <Route exact path='/'>
              {this.state.company && <Home company={this.state.company}/>}
        </Route>

        
        <Route path='/rocket'>
            {/* добавляем пропс rocket, что бы при смене ракеты в state менять тайтл в файле Main.js */}
            <Main rocket={this.state.rocket} />
        
            {/* ДЗ - передать рокетфичерс в фичерс и заполнить данные о ракетах */}
            {/* делаем условие, что верстка будет рендериться только если данные получены */}
            {/* так же сразу деструктуризируем значения с рокет фичерс */}
            {this.state.rocketFeatures && <Features {...this.state.rocketFeatures} />}
        </Route>

        <Route path='/calendar'>
          <Calendar/>
        </Route>
        
        <Route path='/details'>
          <Details />
        </Route>


        {/* если данные с сервера загрузились - передаем деструктуризированные ссылки на все соц.сети в футер */}
        {this.state.company && <Footer {...this.state.company}/>}
      </BrowserRouter>
    
    );
  }
}

export default App;


//  this.fetchData.getCompany().then(data => console.log(data)) c этих данных можно вытянуть все ссылки на соцсети для футера