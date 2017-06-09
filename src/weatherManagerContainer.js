import React from 'react';
import MainWeatherDisplayer from './mainWeatherDisplayer';
import WeatherDisplayer from './weatherDisplayer';
import WeatherAuxiliary from './weatherAuxiliary';
import Input from './input';
import $ from 'jquery';

const apiKey = '87ad902d24be999eed791156678a3ec7';

class WeatherManagerContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			city: '',
			childData: {},
			isQuerySubmitted: false,
			submitValue: '',
			shouldHideF: false,
			shouldHideC: true,
			shouldUpdateMainDisplay: false,
			weather: []
		};
	}
	
	render() {	
		if (this.state.isQuerySubmitted && this.state.weather.length) {
			return (
				<section className="weatherWidget">
					<div className="mainSection">
						<MainWeatherDisplayer
								onClick={this.handleGoBack}
								onClickTemperature={this.handleClickTemperature}
								imgSrc={
									this.state.shouldUpdateMainDisplay ? 
									this.state.childData.imgSrc :
									WeatherAuxiliary.getWeatherImage(this.state.weather[0].icon)
								}
								weatherDescription={
									this.state.shouldUpdateMainDisplay ? 
										this.state.childData.weatherDescription :
										this.state.weather[0].weather[0].description
								}
								city={this.state.city}
								timeInfo={
									this.state.shouldUpdateMainDisplay ? 
									this.state.childData.fullDayOfWeek :
									WeatherAuxiliary.getDayAndTime()
								}
								tempFahrenheit={
									this.state.shouldUpdateMainDisplay ? 
									this.state.childData.tempFahrenheit :
									Math.round(WeatherAuxiliary.kelvinToF(this.state.weather[0].temp.max))
								}
								tempCelcius={
									this.state.shouldUpdateMainDisplay ? 
									this.state.childData.tempCelcius :
									Math.round(WeatherAuxiliary.kelvinToC(this.state.weather[0].temp.max))
								}
								shouldHideF={this.state.shouldHideF}
								shouldHideC={this.state.shouldHideC}
								isForecastItem={false} />
					</div>
					<div className="forecastContainer">
						{this.state.weather.map((data, i) => {
							return <WeatherDisplayer
									key={i}
									onClick={this.handleUpdateMainSection}
									onClickTemperature={this.handleClickTemperature}
									imgSrc={WeatherAuxiliary.getWeatherImage(data.weather[0].icon)}
									weatherDescription={data.weather[0].description}
									dayOfWeek={WeatherAuxiliary.getDayOfWeek(data.dt, false)}
									fullDayOfWeek={WeatherAuxiliary.getDayOfWeek(data.dt, true)}
									city={this.state.city}
									timeInfo={WeatherAuxiliary.getDayAndTime()}
									tempFahrenheit={Math.round(WeatherAuxiliary.kelvinToF(data.temp.max))}
									tempCelcius={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))}
									shouldHideF={this.state.shouldHideF}
									shouldHideC={this.state.shouldHideC}
									isForecastItem={true}
									tempFahrenheightHigh={Math.round(WeatherAuxiliary.kelvinToF(data.temp.max))}
									tempFahrenheightLow={Math.round(WeatherAuxiliary.kelvinToF(data.temp.min))}
									tempCelciusHigh={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))}
									tempCelciusLow={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))} />
						})}
					</div>
				</section>
			);
		} else {
			return <Input onClick={this.handleOnClick} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} />
		}
	}
	
	handleUpdateMainSection = (data) => {
		this.setState({
			shouldUpdateMainDisplay: true,
			childData: data
		});
	}
	
	handleOnClick = () => {
		if (this.state.submitValue) {
			this.downloadWeather(this.state.submitValue, apiKey);
		} else {
			alert('empty!');
			return;
		}
		
		this.setState({
			isQuerySubmitted: true
		});
	}
	
	handleOnChange = (e) => {
		this.setState({
			submitValue: e.target.value
		});
	}
	
	handleGoBack = () => {
		this.setState({
			isQuerySubmitted: false,
			submitValue: ''
		});
	}
	
	handleClickTemperature = () => {
		this.setState({
			shouldHideF: !this.state.shouldHideF,
			shouldHideC: !this.state.shouldHideC
		});
	}
	
	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.handleOnClick();
		}
	}
		
	downloadWeather(city, apiKey) {
		return $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&APPID=' + apiKey).then((data) => {			
			if (data) {
				this.setState({
					city: data.city.name,
					weather: data.list.slice(0, 5)
				});
				
			} else {
				console.log('something went wrong!');
			}
		});
	}
}

export default WeatherManagerContainer;