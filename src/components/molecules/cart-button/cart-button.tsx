import React, { Component, ReactNode } from 'react';
import { ReactComponent as CartLogo } from '../../../icons/empty-cart.svg';
import Cart from '../../organism/cart/cart';



import styles from './style.module.scss'


interface PropsI {
	children?: ReactNode | string;
}

interface StateI { }

class CartButton extends Component<PropsI, StateI> {
	render() {

		return (
			<button className={styles.cartButton}>
				<CartLogo />
			</button>
		);
	}
}
export default CartButton;
