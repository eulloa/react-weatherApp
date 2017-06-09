import React from 'react';
import PropTypes from 'prop-types';

function WeatherDisplayer(props) {
	return (
		<div className="weatherDisplayer" onClick={() => {props.onClick(props)}}>
			<h1>{props.isForecastItem ? props.dayOfWeek : props.city}</h1>
			<h2>{props.timeInfo}</h2>
			<h3 className={props.isForecastItem ? 'displayNone' : ''}>{props.weatherDescription}</h3>
			<section>
				<img src={'/img/' + props.imgSrc} alt={props.weatherDescription} />
				<div>
					<span className={props.shouldHideF ? 'hidden' : ''}>
						{props.isForecastItem ? props.tempFahrenheightHigh + ' ' + props.tempFahrenheightLow : props.tempFahrenheit}
					</span>
					<span className={props.shouldHideC ? 'hidden' : ''}>
						{props.isForecastItem ? props.tempCelciusHigh + ' ' + props.tempCelciusLow : props.tempCelcius}
					</span>
					<button className={props.shouldHideF ? '' : 'inactive'} onClick={props.onClickTemperature}>F</button>
					<button className={props.shouldHideC ? '' : 'inactive'} onClick={props.onClickTemperature}>C</button>
				</div>
			</section>
		</div>
	);
}

WeatherDisplayer.propTypes = {
	city:     			  PropTypes.string.isRequired,
	fullDayOfWeek:        PropTypes.string.isRequired,
	imgSrc:   			  PropTypes.string.isRequired,
	isForecastItem:       PropTypes.bool.isRequired,
	onClickTemperature:   PropTypes.func.isRequired,
	onClick:              PropTypes.func.isRequired,
	shouldHideF:		  PropTypes.bool.isRequired,
	shouldHideC:		  PropTypes.bool.isRequired,
	tempCelciusHigh: 	  PropTypes.number,
	tempCelciusLow:  	  PropTypes.number,
	tempFahrenheightHigh: PropTypes.number,
	tempFahrenheightLow:  PropTypes.number,
	timeInfo:             PropTypes.string.isRequired,
	weatherDescription:   PropTypes.string.isRequired
};

export default WeatherDisplayer;