import React, { Component, ReactNode } from 'react';
import { ReactComponent as AddCartLogo } from '../../../icons/circle-cart-icon.svg';
import Button from '../button/button';

import styles from './style.module.scss'


class CartAddButton extends Component<any, any> {
	onAddCartClick = (e) => {
		e.stopPropagation();
		console.log('stopPropagation')
		this.props.onAddCartClick()
	}
	render() {
		const { onAddCartClick, className, disabled } = this.props
		return (
			<Button onClick={(e) => this.onAddCartClick(e)} disabled={disabled} className={className}>
				<AddCartLogo />
			</Button>
		);
	}
}
export default CartAddButton;
