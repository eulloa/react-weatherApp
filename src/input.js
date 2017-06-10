import React from 'react';
import IconSearch from './img/iconSearch';
import PropTypes from 'prop-types';

function Input(props) {
	return (
		<div className="inputContainer">
			<input onChange={props.onChange} onKeyPress={props.onKeyPress} type="text" placeholder="City name" />
			<button className="btnSearch" onClick={props.onClick}></button>
		</div>
	);
}

Input.propTypes = {
	onChange:   PropTypes.func.isRequired,
	onClick:    PropTypes.func.isRequired,
	onKeyPress: PropTypes.func.isRequired
};

export default Input;