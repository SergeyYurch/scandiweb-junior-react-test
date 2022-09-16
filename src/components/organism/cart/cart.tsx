import { Component, ReactNode } from 'react';
import cn from 'classnames';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartProductCard from '../../molecules/cart-product-card/cart-product-card';

import styles from './style.module.scss'
import CartTotal from '../../molecules/cart-total/cart-total';
import Button from '../../atoms/button/button';
import { RootState } from '../../../store';
import { addProductToCart, updateProductInCart, deleteProductFromCart, clearCart } from '../../../store/cartSlice';
import { statusSetCartView, statusSetCartShow } from '../../../store/statusSlice';
import { generateId } from '../../../helpers/helpers';


const mapState = (state: RootState) => ({
	cartState: state.cart,
	currency: state.status.currency,
	cartIsModal: state.status.cartIsModal
})

const connector = connect(mapState, {
	addProductToCart,
	updateProductInCart,
	deleteProductFromCart,
	clearCart,
	statusSetCartView,
	statusSetCartShow,
})

type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
	modal?: boolean;
}

const getPrice = (product, currency) => {
	return product.prices.find((p) => p.currency.label === currency.label)
}





class Cart extends Component<any, any> {

	componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void => {
		if (this.props.cartState.quantity === 0) this.props.statusSetCartShow(false);
	}

	onUpdateProductCount = (id, oldCount, value) => {
		if ((oldCount + value) < 1) {
			this.props.deleteProductFromCart(id)
			this.props.saveCart();
		} else {
			this.props.updateProductInCart({ id, value })
			this.props.saveCart();

		}
	}


	onOrder = () => {
		alert('Thanks for shopping in our store')
		this.props.clearCart('d')
	}

	onViewBag = () => {
		this.props.statusSetCartView(false)
	}

	onCheckOut = () => {
		this.props.statusSetCartShow(false)
	}


	render() {
		const { modal, cartState, currency } = this.props;
		let { products, quantity = 0 } = cartState
		let total = 0;
		let detailFrame = []
		if (products && products.length > 0) {
			products.forEach((prod) => {
				const price = getPrice(prod.product, currency)
				total += prod.count * price.amount;
			})
		}

		if (products) detailFrame = products.map((cartProduct) => {
			const price = getPrice(cartProduct.product, currency)
			return (
				<CartProductCard
					key={generateId()}
					cartProduct={cartProduct}
					price={price}
					onUpdateProductCount={this.onUpdateProductCount}
					modal={modal}
					className={styles.productItem}
				/>
			)
		})


		return (
			<div className={modal ? styles.cartOverlayModal : styles.cartOverlay} onClick={this.props.closeModal} >
				<div className={styles.cartWrapper}>
					<div
						className={modal ? styles.modalContainer : styles.cartContainer}
						onClick={(e) => { e.stopPropagation() }}
					>
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

					</div>
				</div>
			</div>
		);
	}
}

export default connector(Cart);


