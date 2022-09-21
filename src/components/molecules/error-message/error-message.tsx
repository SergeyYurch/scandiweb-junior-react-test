import React, { Component } from 'react';
import { ReactComponent as ErrorSVG } from './error.svg';


class ErrorMessageIcon extends Component {
	render() {

		return (
			<div style={{ margin: '0 auto', textAlign: 'center', marginTop: '100px', width: '100%' }}>
				<ErrorSVG />
			</div>
		);
	}
}
export default ErrorMessageIcon;
