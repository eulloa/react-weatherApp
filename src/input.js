import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
	const placeholderText = 'Enter city name, zip code, state or country...';

	return (
		<div className="inputContainer">
			<input onChange={props.onChange} 
			       onKeyPress={props.onKeyPress} 
			       type="text" 
			       placeholder={placeholderText} 
			       autoFocus={true}
			/>
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