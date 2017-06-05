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
			weather: [],
			weatherDescription: '',
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
		if (this.state.isQuerySubmitted) {
			return (
				<ul>
				{this.state.weather.map((data, i) => {
					return <WeatherDisplayer
							key={i}
							onClick={this.handleGoBack}
							onClickTemperature={this.handleClickTemperature}
							imgSrc={WeatherAuxiliary.getWeatherImage(data.weather[0].icon)}
							weatherDescription={data.weather[0].description}
							city={this.state.city}
							timeInfo={WeatherAuxiliary.getDayAndTime()}
							tempFahrenheit={WeatherAuxiliary.kelvinToF(data.main.temp)}
							tempCelcius={WeatherAuxiliary.kelvinToC(data.main.temp)}
							shouldHideF={this.state.shouldHideF}
							shouldHideC={this.state.shouldHideC} />
				})}
				</ul>
			);
		} else {
			return <Input onClick={this.handleOnClick} onChange={this.handleOnChange} />
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
		return $.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + apiKey).then((data) => {			
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