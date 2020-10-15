import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../logo.svg'
import './header.css';


const Header = (props) => (
    <header className="header">
		
		<Link to='/'>
			  <img
        // вставка нашего импортированого лого с ./log.svg
        src={logo}
				alt="Logo Space X"
				className="logo"
		/>
		</Link>

		<nav className="main-nav nav">
			<ul className="list">
				{/* строим список с ракетами с пропсов */}
				{props.rockets.map((rocket, i) => ( 
					<li key={i} className="item">
						<Link 
							to='/rocket'
							onClick={() => {
								props.changeRocket(rocket);
							}}
							className="item-link">
							{rocket}</Link>
					</li>
				))}
			</ul>
		</nav>
		<nav className="secondary-nav">
			<ul className="list">
				<li className="item">
					{/* NavLink используется для того, 
					что бы передавать так же активный класс, для подстветки текущей страницы */}
					<NavLink exact to="/"
						className="item-link"
						activeClassName="active"
					>Home</NavLink>
				</li>
				<li className="item">
					<NavLink exact to="calendar"
						className="item-link"
						activeClassName="active"
					>Calendar</NavLink>
				</li>
			</ul>
		</nav>
	</header>
);

export default Header;