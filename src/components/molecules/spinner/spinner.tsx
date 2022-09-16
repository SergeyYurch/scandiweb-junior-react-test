import React, { Component } from 'react';
import { ReactComponent as SpinnerSvg } from './spinner.svg';

class Spinner extends Component {

	render() {

		return (
			<div className="spinner" style={{ margin: '0 auto', textAlign: 'center', marginTop: '250px' }}>
				<SpinnerSvg />
			</div>
		);
	}
}
export default Spinner;
