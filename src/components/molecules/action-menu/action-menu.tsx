import { Component } from 'react';

import CartButton from '../cart-button/cart-button';
import CurrensyButton from '../../atoms/currency-button/currency-button';

import styles from './style.module.scss'


class ActionMenu extends Component {

	render() {

		return (
			<div className={styles.actionWrapper} >
				<CurrensyButton />
				<CartButton />
			</div>
		);
	}
}
export default ActionMenu;
