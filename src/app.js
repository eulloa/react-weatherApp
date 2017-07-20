import React from 'react';

//components
import WeatherManagerContainer from './weatherManagerContainer';
import Input from './input';

//deps
import axios from 'axios';

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

		this.handleUpdateMainSection = this.handleUpdateMainSection.bind(this)
		this.handleOnClick = this.handleOnClick.bind(this)
		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleGoBack = this.handleGoBack.bind(this)
		this.handleClickTemperature = this.handleClickTemperature.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.downloadWeather = this.downloadWeather.bind(this)
	}
	
	render() {
		const input = <Input initialInputValue={this.state.submitValue} onClick={this.handleOnClick} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} />;

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
			submitValue: '',
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
		axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&APPID=' + apiKey)
			.then((res) => {
				this.setState({
					city: res.data.city.name,
					weather: res.data.list.slice(0, 5)
				})
			}).catch((e) => {
				console.log(e)
			})
	}
}

export default App;