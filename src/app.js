import React from 'react';

//components
import WeatherManagerContainer from './weatherManagerContainer';
import Input from './input';

//deps
import $ from 'jquery';

//transitions
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const apiKey = '87ad902d24be999eed791156678a3ec7';

class App extends React.Component {
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
		const input = <Input onClick={this.handleOnClick} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} />;

		if (this.state.isQuerySubmitted && this.state.weather.length) {
			const weatheContainer = <WeatherManagerContainer 
							city={this.state.city} 
							childData={this.state.childData}
							handleClickTemperature={this.handleClickTemperature}
							handleUpdateMainSection={this.handleUpdateMainSection}
							key="0"
							shouldHideC={this.state.shouldHideC}
							shouldHideF={this.state.shouldHideF}
							shouldUpdateMainDisplay={this.state.shouldUpdateMainDisplay}
							weather={this.state.weather}
						/>
			return (
				<div>
					{input}
					<ReactCSSTransitionGroup 
						transitionName="anim" 
						transitionAppear={true} 
						transitionAppearTimeout={500}
						transitionEnter={false}
						transitionLeave={false}>
						{weatheContainer}
					</ReactCSSTransitionGroup>
				</div>
			)

		} else {
			return (
				<div>{input}</div>
			)
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

export default App;