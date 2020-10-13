import React from 'react';
// все стили идут отдельными файлами для оптимизации - когда элемент не отображается, его стили не загружаются
import './main.css';

const Main = () => (
    <section className="main">  
		<h1 className="title">
			Falcon 1
		</h1>

		<div className="video-container">
			<video className="video" autoPlay loop muted src="./video/moon.mp4"></video>

		</div>
	</section>
)

export default Main;