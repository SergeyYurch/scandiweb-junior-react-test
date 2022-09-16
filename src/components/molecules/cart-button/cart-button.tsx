import React, { Component, ReactNode } from 'react';
import { ReactComponent as CartLogo } from '../../../icons/empty-cart.svg';
import { Route, withRouter, Switch } from "react-router-dom";

import styles from './style.module.scss'


interface PropsI {
	children?: ReactNode | string;
}

interface StateI { }

class CartButton extends Component<any, any> {
	render() {
		const { quantity, onCartClick } = this.props

		// () => this.props.history.push('/cart')
		return (
			<button onClick={onCartClick} className={styles.cartButton}>
				<CartLogo />
				{quantity > 0 && <p className={styles.quantity}> {quantity}</p>}

			</button>
		);
	}
}
export default withRouter(CartButton);
