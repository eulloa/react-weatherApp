import React from 'react';

function WeatherDisplayer(props) {
	return (
		<div className="weatherDisplayer">
			<h1>{props.city}</h1>
			<h2>{props.timeInfo}</h2>
			<img src={'/img/' + props.imgSrc} alt='weather icon' />
			<button className="btnBack" onClick={props.onClick}>Go Back</button>
		</div>
	);
}

export default WeatherDisplayer;