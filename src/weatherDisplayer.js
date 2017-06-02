import React from 'react';

function WeatherDisplayer(props) {
	return (
		<div className="weatherDisplayer">
			<h1>{props.city}</h1>
			<h2>{props.timeInfo}</h2>
			<section>
				<img src={'/img/' + props.imgSrc} alt='weather icon' />
				<div>
					<span className={props.shouldHideF ? 'hidden' : ''}>{props.tempFahrenheit}</span>
					<span className={props.shouldHideC ? 'hidden' : ''}>{props.tempCelcius}</span>
					<button className={props.shouldHideF ? '' : 'inactive'} onClick={props.onClickTemperature}>F</button>
					<button className={props.shouldHideC ? '' : 'inactive'} onClick={props.onClickTemperature}>C</button>
				</div>
			</section>
			<button className="btnBack" onClick={props.onClick}>Go Back</button>
		</div>
	);
}

export default WeatherDisplayer;