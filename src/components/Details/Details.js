import React, { useState, useEffect } from 'react';
import useLaunches from '../useLaunches/useLaunches';
import { Link, useHistory } from 'react-router-dom';
import Youtube from 'react-youtube';
import './details.css';
// import Main from '../Main/Main';

import Main from '../Main/Main';
import YouTube from 'react-youtube';




// функция для возврата на предыдущую страницу браузера для кнопки "Назад"
const Details = (props) => {

	const [launch, setLaunch] = useState(null);
	const { getLaunch } = useLaunches();

	// вытаскиваем один запуск ракеты 
	useEffect(() => {
		setLaunch(getLaunch(props.match.params.id))
	}, [getLaunch] )

	const history = useHistory();
	console.log(launch)

	if(!launch) return <div>Loading, please wait...</div>

	return (
		<>
			<Main name={launch.name}/>	
	
			<main className="details">
					
				<div className="container">
					<div className="details-row">
						<div className="details-image">
							<img src={launch.links.patch.small} alt={launch.name} />
						</div>
						<div className="details-content">
							<p className="details-description">{launch.details}</p>
						</div>
					</div>

						<YouTube className='details-youtube' videoId={launch.links.youtube_id}/>

				</div>
					<Link onClick={history.goBack} className="button button-back">go back</Link>
			</main>
				
		</>
	)};

export default Details;