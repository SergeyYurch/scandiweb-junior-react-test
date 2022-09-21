import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import CartProductCard from '../../molecules/cart-product-card/cart-product-card';
import CartTotal from '../../molecules/cart-total/cart-total';
import Button from '../../atoms/button/button';

import { RootState } from '../../../store';
import { updateProductInCart, deleteProductFromCart, clearCart } from '../../../store/cartSlice';
import { statusSetCartView, statusSetCartShow } from '../../../store/statusSlice';
import { Price } from '../../../types/data.types';
import { getPrice } from '../../../helpers/helpers';

import styles from './style.module.scss'
import ErrorBoundary from '../../error-boundary/error-boundary';

const mapState = (state: RootState) => ({
	cartState: state.cart,
	currency: state.status.currency,
})

const connector = connect(mapState, {
	updateProductInCart,
	deleteProductFromCart,
	clearCart,
	statusSetCartView,
	statusSetCartShow,
})

type PropsFromRedux = ConnectedProps<typeof connector>
type OwnProps = { modal?: boolean }
type Props = PropsFromRedux & OwnProps

class Cart extends Component<Props> {

	componentDidUpdate = (): void => {
		if (this.props.cartState.quantity === 0) this.props.statusSetCartShow(false);
	}

	onUpdateProductCount = (id: string, oldCount: number, value: number): void => {
		if ((oldCount + value) < 1) {
			this.props.deleteProductFromCart(id)
		} else {
			this.props.updateProductInCart({ id, value })
		}
	}

	onOrder = (): void => {
		alert('Thanks for shopping in our store')
		this.props.clearCart()
	}

	onViewBag = (): void => {
		this.props.statusSetCartView(false)
	}

	onCheckOut = (): void => {
		this.props.statusSetCartShow(false)
	}

	render(): JSX.Element {
		const { modal, cartState, currency } = this.props;
		const { products, quantity = 0 } = cartState
		let total: number = 0;
		let detailFrame: JSX.Element[] = [];
		if (products && products.length > 0) {
			products.forEach((cartProduct) => {
				const price: Price = getPrice(cartProduct.product, currency)
				total += cartProduct.count * price.amount;
			})
		}

		if (products) detailFrame = products.map((cartProduct) => {
			const price: Price = getPrice(cartProduct.product, currency)
			return (
				<CartProductCard
					key={cartProduct.id}
					cartProduct={cartProduct}
					price={price}
					onUpdateProductCount={this.onUpdateProductCount}
					modal={modal}
					className={styles.productItem}
				/>
			)
		})

		return (
			<div className={modal ? styles.cartOverlayModal : styles.cartOverlay} >
				<div className={styles.cartWrapper}>
					<div
						className={modal ? styles.modalContainer : styles.cartContainer}
						onClick={(e) => { e.stopPropagation() }}
					>
						<ErrorBoundary>
							<>
								<div className={styles.headerCart}>
									{modal && <h2 className={styles.headerCart}>My Bag, <span>{quantity} items</span></h2>}
									{!modal && <h2 className={styles.headerCart}>Cart</h2>}
								</div>

								{products &&
									<div className={styles.productList}>
										{detailFrame}
									</div>
								}

								<CartTotal modal={modal} quantity={quantity} currencySymbol={currency.symbol} total={total} className={styles.total} />

								<div className={styles.control}>
									{!modal && <Button className={styles.btn} onClick={this.onOrder}>ORDER</Button>}
									{modal && <Button className={styles.btn} onClick={this.onViewBag}>VIEW BAG</Button>}
									{modal && <Button className={styles.btn} onClick={this.onCheckOut}>CHEK OUT</Button>}
								</div>
							</>
						</ErrorBoundary>
					</div>
				</div>
			</div>
		);
	}
}

export default connector(Cart);


