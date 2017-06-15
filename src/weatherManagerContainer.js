import React from 'react';

//components
import MainWeatherDisplayer from './mainWeatherDisplayer';
import WeatherDisplayer from './weatherDisplayer';
import WeatherAuxiliary from './weatherAuxiliary';

//prop types
import PropTypes from 'prop-types';

function WeatherManagerContainer(props) {
	return (
		<section className="weatherWidget">
			<div className="mainSection">
				<MainWeatherDisplayer
						onClickTemperature={props.handleClickTemperature}
						imgSrc={
							props.shouldUpdateMainDisplay ? 
							props.childData.imgSrc :
							WeatherAuxiliary.getWeatherImage(props.weather[0].icon)
						}
						weatherDescription={
							props.shouldUpdateMainDisplay ? 
								props.childData.weatherDescription :
								props.weather[0].weather[0].description
						}
						city={props.city}
						timeInfo={
							props.shouldUpdateMainDisplay ? 
							props.childData.fullDayOfWeek :
							WeatherAuxiliary.getDayAndTime()
						}
						tempFahrenheit={
							props.shouldUpdateMainDisplay ? 
							props.childData.tempFahrenheit :
							Math.round(WeatherAuxiliary.kelvinToF(props.weather[0].temp.max))
						}
						tempCelcius={
							props.shouldUpdateMainDisplay ? 
							props.childData.tempCelcius :
							Math.round(WeatherAuxiliary.kelvinToC(props.weather[0].temp.max))
						}
						shouldHideF={props.shouldHideF}
						shouldHideC={props.shouldHideC}
						isForecastItem={false} />
			</div>
			<div className="forecastContainer">
				{props.weather.map((data, i) => {
					return <WeatherDisplayer
							key={i}
							onClick={props.handleUpdateMainSection}
							onClickTemperature={props.handleClickTemperature}
							imgSrc={WeatherAuxiliary.getWeatherImage(data.weather[0].icon)}
							weatherDescription={data.weather[0].description}
							dayOfWeek={WeatherAuxiliary.getDayOfWeek(data.dt, false)}
							fullDayOfWeek={WeatherAuxiliary.getDayOfWeek(data.dt, true)}
							city={props.city}
							timeInfo={WeatherAuxiliary.getDayAndTime()}
							tempFahrenheit={Math.round(WeatherAuxiliary.kelvinToF(data.temp.max))}
							tempCelcius={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))}
							shouldHideF={props.shouldHideF}
							shouldHideC={props.shouldHideC}
							isForecastItem={true}
							tempFahrenheightHigh={Math.round(WeatherAuxiliary.kelvinToF(data.temp.max))}
							tempFahrenheightLow={Math.round(WeatherAuxiliary.kelvinToF(data.temp.min))}
							tempCelciusHigh={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))}
							tempCelciusLow={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))} />
				})}
			</div>
		</section>
	);
}

WeatherManagerContainer.propTypes = {
	weather: PropTypes.array.isRequired
};

export default WeatherManagerContainer;