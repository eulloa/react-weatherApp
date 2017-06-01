import React from 'react';
import WeatherDisplayer from './weatherDisplayer';
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
			weatherImage: ''
		};
	}
	
	render() {
		let component = null;		
		if (this.state.isQuerySubmitted) {
			component = <WeatherDisplayer 
							data={this.state.weather} 
							onClick={this.handleGoBack} 
							imgSrc={this.state.weatherImage} 
							city={this.state.city}
							timeInfo={this.getDayAndTime()} />
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
		
	downloadWeather(city, apiKey) {
		return $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apiKey).then((data) => {			
			if (data) {
				console.log(data);
				this.setState({
					city: data.name,
					weatherImage: this.getWeatherImage(data.weather[0].icon),
					weather: data
				});	
			} else {
				console.log('something went wrong!');
			}
		});
	}
	
	getDayAndTime() {
		let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let d = new Date(),
		    dayOfWeek = daysOfWeek[d.getDay()],
		    hours = d.getHours(),
		    mins  = d.getMinutes(),
		    amOrPm = 'AM';
		
		if (hours > 12) {
			hours = hours - 12;
			amOrPm = "PM";
		} else if (hours === 0) {
			hours = 12;
		}
		
		if (mins < 10) {
			mins = "0" + mins;
		}
		 
		return dayOfWeek + " " + hours + ":" + mins + " " + amOrPm;
	}
	
	getWeatherImage(conditions) {
		switch(conditions) {
			case '01d':
				return 'sunny.png';
			case '01n':
				return 'clear.png';
			case '02d':
				return 'partly-cloudy.png';
			case '03d':
				return 'cloudy.png';
			case '09d':
				return 'rain.png';
			case '10d':
				return 'drizzle.png';
			case '11d':
				return 'thunderstorms.png';
			case '50d':
				return 'smoke.png';	
			default:
				return 'sunny.png';
		}
	}
}

export default WeatherManagerContainer;