import React from 'react';
import IconSearch from './img/iconSearch';

function Input(props) {
	return (
		<div>
			<input onChange={props.onChange} type="text" placeholder="City name" />
			<button className="btnSearch" onClick={props.onClick}><IconSearch /></button>
		</div>
	);
}

export default Input;