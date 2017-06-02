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
			isQuerySubmitted: false,
			weather: '',
			submitValue: '',
			city: '',
			weatherImage: '',
			tempFahrenheit: '',
			tempCelcius: '',
			shouldHideF: false,
			shouldHideC: true
		};
	}
	
	render() {
		let component = null;		
		if (this.state.isQuerySubmitted) {
			component = <WeatherDisplayer 
							data={this.state.weather} 
							onClick={this.handleGoBack}
							onClickTemperature={this.handleClickTemperature}
							imgSrc={this.state.weatherImage} 
							city={this.state.city}
							timeInfo={WeatherAuxiliary.getDayAndTime()}
							tempFahrenheit={this.state.tempFahrenheit}
							tempCelcius={this.state.tempCelcius}
							shouldHideF={this.state.shouldHideF}
							shouldHideC={this.state.shouldHideC} />
		} else {
			component = <Input onClick={this.handleOnClick} onChange={this.handleOnChange} />
		}
		
		return component;
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
			isQuerySubmitted: false
		});
	}
	
	handleClickTemperature = () => {
		this.setState({
			shouldHideF: !this.state.shouldHideF,
			shouldHideC: !this.state.shouldHideC
		});
	}
		
	downloadWeather(city, apiKey) {
		return $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apiKey).then((data) => {			
			if (data) {
				console.log(data);
				this.setState({
					city: data.name,
					weatherImage: WeatherAuxiliary.getWeatherImage(data.weather[0].icon),
					weather: data,
					tempFahrenheit: WeatherAuxiliary.kelvinToF(data.main.temp),
					tempCelcius: WeatherAuxiliary.kelvinToC(data.main.temp)
				});	
			} else {
				console.log('something went wrong!');
			}
		});
	}
}

export default WeatherManagerContainer;