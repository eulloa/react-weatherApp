import React from 'react';
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
			isQuerySubmitted: false,
			submitValue: '',
			shouldHideF: false,
			shouldHideC: true,
			weather: []
		};
	}
	
	render() {	
		if (this.state.isQuerySubmitted && this.state.weather.length) {
			return (
				<section className="weatherWidget">
					<div className="mainSection">
						<WeatherDisplayer
								onClick={this.handleGoBack}
								onClickTemperature={this.handleClickTemperature}
								imgSrc={WeatherAuxiliary.getWeatherImage(this.state.weather[0].icon)}
								weatherDescription={this.state.weather[0].weather[0].description}
								city={this.state.city}
								timeInfo={WeatherAuxiliary.getDayAndTime()}
								tempFahrenheit={Math.round(WeatherAuxiliary.kelvinToF(this.state.weather[0].main.temp))}
								tempCelcius={Math.round(WeatherAuxiliary.kelvinToC(this.state.weather[0].main.temp))}
								shouldHideF={this.state.shouldHideF}
								shouldHideC={this.state.shouldHideC}
								isForecastItem={false} />
					</div>
					<div className="forecastContainer">
						{this.state.weather.map((data, i) => {
							console.log('data.dt_txt: ' + data.dt_txt);
							return <WeatherDisplayer
									key={i}
									onClick={this.handleGoBack}
									onClickTemperature={this.handleClickTemperature}
									imgSrc={WeatherAuxiliary.getWeatherImage(data.weather[0].icon)}
									weatherDescription={data.weather[0].description}
									dayOfWeek={WeatherAuxiliary.getAbbreviatedDayOfWeek(data.dt_txt)}
									city={this.state.city}
									timeInfo={WeatherAuxiliary.getDayAndTime()}
									tempFahrenheit={Math.round(WeatherAuxiliary.kelvinToF(data.main.temp))}
									tempCelcius={Math.round(WeatherAuxiliary.kelvinToC(data.main.temp))}
									shouldHideF={this.state.shouldHideF}
									shouldHideC={this.state.shouldHideC}
									isForecastItem={true}
									tempFahrenheightHigh={Math.round(WeatherAuxiliary.kelvinToF(data.main.temp_max))}
									tempFahrenheightLow={Math.round(WeatherAuxiliary.kelvinToF(data.main.temp_min))}
									tempCelciusHigh={Math.round(WeatherAuxiliary.kelvinToC(data.main.temp_max))}
									tempCelciusLow={Math.round(WeatherAuxiliary.kelvinToC(data.main.temp_max))} />
						})}
					</div>
				</section>
			);
		} else {
			return <Input onClick={this.handleOnClick} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} />
		}
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
		return $.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + apiKey).then((data) => {			
			if (data) {
				console.log(data);
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