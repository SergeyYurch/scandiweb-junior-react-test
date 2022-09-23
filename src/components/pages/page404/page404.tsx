import { Component } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessageIcon from '../../molecules/error-message/error-message'

class Page404 extends Component {
	render() {
		return <div>
			<ErrorMessageIcon />
			<p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
			<Link style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px' }} to="/">Back to main page</Link>
		</div>
	}
}

export default Page404