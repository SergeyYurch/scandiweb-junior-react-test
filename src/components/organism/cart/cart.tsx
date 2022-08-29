import { Component, ReactNode } from 'react';
import cn from 'classnames';

import CartProductCard from '../../molecules/cart-product-card/cart-product-card';

import styles from './style.module.scss'
import CartTotal from '../../molecules/cart-total/cart-total';
import Button from '../../atoms/button/button';


interface PropsI {
	modal?: boolean;
}

interface StateI { }

class Cart extends Component<PropsI, StateI> {
	render() {
		const { modal } = this.props;
		return (
			<div className={cn(styles.cartContainer, { [styles["modal"]]: modal })}>
				{modal && <h2 className={styles.headerCart}>My Bag, <span>3 items</span></h2>}
				{!modal && <h2 className={styles.headerCart}>Cart</h2>}

				<div className={styles.productList}>
					<CartProductCard modal={modal} />
					<CartProductCard modal={modal} />
					<CartProductCard modal={modal} />

				</div>
				<CartTotal modal={modal} className={styles.total} />
				<div className={styles.control}>
					{!modal && <Button className={styles.btnOrder}>ORDER</Button>}
					{modal && <Button className={styles.btnOrder}>VIEW BAG</Button>}
					{modal && <Button className={styles.btnOrder}>CHEK OUT</Button>}
				</div>

			</div>
		);
	}
}
export default Cart;
