import React from 'react';

// дефаулт-импорт
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import FetchData from './service/FetchData';


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
  }

  // метод жизненного цикла компонента. Did - работает после рендера, Will - после
  componentDidMount() {
    this.updateRocket();
   
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


  // в ретурне должен быть только 1 общий родитель иначе будет ошибка
  render() {
    console.log(this.state)

    return (
      // обёртка родитель. Делаем её фрагментом, что бы не отображть ее в конечной верстке как лишний элемент
      // сокращенная версия React.Fragment - пустые скобки <>
      <React.Fragment>
        {/* вставляю импортированный файлы с версткой */}
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket}/>

        {/* добавляем пропс rocket, что бы при смене ракеты в state менять тайтл в файле Main.js */}
        <Main rocket={this.state.rocket} />
        
        {/* ДЗ - передать рокетфичерс в фичерс и заполнить данные о ракетах */}
        <Features rocketFeatures={this.state.rocketFeatures}/>
        <Footer data={this.fetchData.getCompany().then(data => data)}/>
      </React.Fragment>
    
    );
  }
}

export default App;


//  this.fetchData.getCompany().then(data => console.log(data)) c этих данных можно вытянуть все ссылки на соцсети для футера