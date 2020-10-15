import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './calendar.css';
import Main from '../Main/Main';
import FetchData from '../../service/FetchData';

const fetchData = new FetchData();

const Calendar = () => {
	
	// хуки - прекрасны тем, что можно использовать состояния без использования классов и стейтов и пропсов


	// деструктурируем и получаем данные и функцию
	const [data, setData] = useState([]); 


	// useEffect нужен для побочных эффектов, для работы с данными от сервера например
	// второй параметр пустого массива передан для того, что бы функция Setdata не вызывалась постоянно
	useEffect(() => {
		fetchData.getLaunches()
			.then(launches => setData(state => [...launches]))
	}, [])

	// console.log(data)
	return (
		<>
			<Main />
			<section className="calendar">
				<div className="container">
					<ul className="calendar-list">
					
						{
							data.map(item => (
								<li className="calendar-item" key={item.id}>
									<article className="launches">
										<div className="launches-image">
											<img src={item.links.patch.small}
												alt="" />
								
										</div>
										<div className="launches-content">
											<h2 className="launches-title">{item.name}</h2>
											
											<Link
												to={{
													pathname: "/details",
													state: {title: `${item.name}`,}
												}}
												
												className="button launches-details"
											>Подробнее</Link>
										</div>
									</article>
						</li>
							))
						}
					</ul>
				</div>
			</section>
		</>
	)
};

export default Calendar;
