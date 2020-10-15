import React, { useEffect, useState } from 'react';
import './details.css';
// import Main from '../Main/Main';
import { Link } from 'react-router-dom';
import FetchData from '../../service/FetchData';

const fetchData = new FetchData();



// функция для возврата на предыдущую страницу браузера для кнопки "Назад"
function goBack() {
	window.history.back();
}

const Details = () => {

		// деструктурируем и получаем данные и функцию
	const [data, setData] = useState([]); 
	console.log(data)

	// useEffect нужен для побочных эффектов, для работы с данными от сервера например
	// второй параметр пустого массива передан для того, что бы функция Setdata не вызывалась постоянно
	useEffect(() => {
		fetchData.getLaunches()
			.then(launches => setData(state => [...launches]))
	}, [])
	return (
			<>
		{/* <Main /> */}
			
		
			
		{data.map(item => {
			
		return (
			<>
				
				<section className="main">  
					<h1 className="title">{	item.name }</h1>
				</section>

				<main className="details" key={item.id}>
				
					
				<div className="container">
					<div className="details-row">
						<div className="details-image">
							<img src={item.links.patch.small} alt="" />
						</div>
						<div className="details-content">
							<p className="details-description">{item.details}</p>
						</div>
					</div>
					<div>
							<iframe title='title'
								className="details-youtube"
								width="560" height="315"
								src={item.links.webcast}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen>
							</iframe>
					</div>
				</div>
					<Link onClick={goBack} to={{}} className="button button-back">go back</Link>
	    		</main>
			</>
		)
		})}
			
    </>
   )
};

export default Details;