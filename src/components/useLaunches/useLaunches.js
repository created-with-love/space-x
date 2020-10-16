import { useEffect, useState } from 'react';
import FetchData from '../../service/FetchData';

const fetchData = new FetchData();

const useLaunches = () => {
    // хуки - прекрасны тем, что можно использовать состояния без использования классов и стейтов и пропсов
	// деструктурируем и получаем данные и функцию
    const [data, setData] = useState([]); 

	// useEffect нужен для побочных эффектов, для работы с данными от сервера например
	// второй параметр пустого массива передан для того, что бы функция Setdata не вызывалась постоянно
	useEffect(() => {
		fetchData.getLaunches()
			.then(launches => setData(state => [...launches]))
    }, [])
    

    // берем один полёт и вернем только по совпадению по айди
    const getLaunch = id => data.find(item => item.id === id)
    

    return { data, getLaunch }
}



export default useLaunches;