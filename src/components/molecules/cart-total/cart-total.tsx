import { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'
import PriceFrame from '../price-frame/price-frame';
import classNames from 'classnames';

interface PropsI {
	className?: string;
	modal?: boolean;
}

interface StateI { }

class CartTotal extends Component<PropsI, StateI> {
	render() {
		const {
			className,
			modal,
		} = this.props;
		return (
			<div className={
				cn(
					styles.totalContainer,
					className,
					{
						[styles['modal']]: modal
					}
				)
			}>
				{!modal &&
					<div>
						<div className={styles.item}>
							<p className={styles.label}>Tax 21%:</p>
							<PriceFrame className={styles.value}>$42</PriceFrame>
						</div>
						<div className={styles.item}>
							<p className={styles.label}>Quantity:</p>
							<p className={styles.value}>3</p>
						</div>
					</div>
				}
				<div className={styles.item}>
					<p className={styles.total}>Total:</p>
					<PriceFrame className={styles.value}>$200</PriceFrame>
				</div>
			</div >
		);
	}
}
export default CartTotal;
