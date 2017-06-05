import React from 'react';
import IconSearch from './img/iconSearch';
import PropTypes from 'prop-types';

function Input(props) {
	return (
		<div>
			<input onChange={props.onChange} type="text" placeholder="City name" />
			<button className="btnSearch" onClick={props.onClick}><IconSearch /></button>
		</div>
	);
}

Input.propTypes = {
	onChange: PropTypes.func.isRequired,
	onClick:  PropTypes.func.isRequired	
};

export default Input;