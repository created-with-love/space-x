import React from 'react';
// все стили идут отдельными файлами для оптимизации - когда элемент не отображается, его стили не загружаются
import './main.css';


const video = {
	"Falcon 1": "moon",
	"Falcon 9": "earth",
	"Falcon Heavy": "mars",
	other: "space",
}

const Main = ({ rocket, name }) => (

	<section className="main">  
		{/*  динамический тайтл, принимает пропс c App.js   */}
		<h1 className="title">{name || rocket}</h1>

		{rocket &&	<div className="video-container">
			<video
				className="video"
				autoPlay loop muted
				src={`./video/${video.hasOwnProperty(rocket) ?
					video[rocket] : video.other}.mp4`
				}
			/>
		</div>}
	</section>
	
)

export default Main;