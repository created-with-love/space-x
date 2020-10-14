// файл для организации запросов на сервер
export default class FetchData {

    // взят АПИ с https://github.com/r-spacex/SpaceX-API для запроса
    startUrl = 'https://api.spacexdata.com/v4/';

    // метод для запроса данных с сервера
    getResource = async url => {
        // async await добавленны для асинхронности, что бы наш ретёрн дождался ответа от сервера, а не сработал сразу
        const res = await fetch(url);

        // свойство ok -может быть true\falseб получили ли данные
        // res.status - текст ошибки получения
        if (!res.ok) {
            throw new Error (`Произошла ошибка ${res.status}`)
        }

        return await res.json();
    };

    // получаем ракету
    getRocket = async () =>
        await this.getResource(this.startUrl + 'rockets');
    // получаем календарь запусков
    getLaunches = async () =>
        await this.getResource(this.startUrl + 'launches/past');

    getCompany = async () =>
        await this.getResource(this.startUrl + 'company');

}