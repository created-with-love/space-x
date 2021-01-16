import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import FetchData from './service/FetchData';

import Calendar from './components/Calendar/Calendar';
import Details from './components/Details/Details';

import './style.css';

class App extends React.Component {
  // fetchData - Обьект со всеми свойствами класса FetchData
  fetchData = new FetchData();

  state = {
    // стейт нельзя менять напрямую, только методами с React.Component (setState)
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null,
  };

  // метод жизненного цикла компонента, работает после рендера
  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
  }

  // метод для обновления данных по ракете
  updateRocket() {
    this.fetchData
      .getRocket()
      .then(data => {
        this.setState({ rockets: data.map(item => item.name) });
        return data;
      })
      .then(data => data.find(item => item.name === this.state.rocket)) // ищет ракету с нужным именем
      .then(rocketFeatures => {
        this.setState({ rocketFeatures });
      }); // setState - спец метод для обновления данных
  }

  // метод для смены ракеты на экране
  changeRocket = rocket => {
    this.setState(
      {
        rocket,
      },
      this.updateRocket,
    );
  };

  updateCompany = () => {
    this.fetchData.getCompany().then(company => this.setState({ company }));
  };
  render() {
    return (
      <BrowserRouter>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />

        <Route
          exact
          path="/"
          render={props => {
            console.log(props);
            return this.state.company && <Home company={this.state.company} />;
          }}
        />

        <Route
          path="/rocket/:rocket"
          render={() =>
            this.state.rocketFeatures && (
              <Features {...this.state.rocketFeatures} />
            )
          }
        />
        {/* добавляем пропс rocket, что бы при смене ракеты в state менять тайтл в файле Main.js */}
        {/* делаем условие, что верстка будет рендериться только если данные получены */}
        {/* так же сразу деструктуризируем значения с рокет фичерс */}

        {/* вариант подключения через атрибут компонента  */}
        <Route path="/calendar" component={Calendar} />

        {/* /:id - принимаем айди при переходе на каждый полёт для создания такого свойства в пропс*/}
        <Route path="/details/:id" component={Details} />

        {/* если данные с сервера загрузились - передаем деструктуризированные ссылки на все соц.сети в футер */}
        {this.state.company && <Footer {...this.state.company} />}
      </BrowserRouter>
    );
  }
}

export default App;

//  this.fetchData.getCompany().then(data => console.log(data)) c этих данных можно вытянуть все ссылки на соцсети для футера
