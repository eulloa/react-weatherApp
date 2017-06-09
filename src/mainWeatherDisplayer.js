import React from 'react';
import PropTypes from 'prop-types';

function MainWeatherDisplayer(props) {
	return (
		<div className="weatherDisplayer">
			<h1>{props.city}</h1>
			<h2>{props.timeInfo}</h2>
			<h3>{props.weatherDescription}</h3>
			<section>
				<img src={'/img/' + props.imgSrc} alt={props.weatherDescription} />
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

MainWeatherDisplayer.propTypes = {
	city:     			  PropTypes.string.isRequired,
	imgSrc:   			  PropTypes.string.isRequired,
	onClickTemperature:   PropTypes.func.isRequired,
	onClick:              PropTypes.func.isRequired,
	shouldHideF:		  PropTypes.bool.isRequired,
	shouldHideC:		  PropTypes.bool.isRequired,
	timeInfo:             PropTypes.string.isRequired,
	weatherDescription:   PropTypes.string.isRequired
};

export default MainWeatherDisplayer;