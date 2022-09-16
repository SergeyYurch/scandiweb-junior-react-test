import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';


import Logo from '../../atoms/logo/logo';
import ActionMenu from '../../molecules/action-menu/action-menu';
import CategoryMenu from '../../molecules/category-menu/category-menu';
import CurrencyModal from '../../molecules/currency-modal/currency-modal';
import Cart from '../../organism/cart/cart';
import { RootState } from '../../../store';

import styles from './style.module.scss'
import { statusSetCartShow, statusSetCurrencyIsShow, statusSetCartView } from '../../../store/statusSlice';


const mapState = (state: RootState) => ({
	currencyIsShow: state.status.currencyIsShow,
	cartIsShow: state.status.cartIsShow,
	cartIsModal: state.status.cartIsModal,
	cart: state.cart
})

const connector = connect(mapState, { statusSetCurrencyIsShow, statusSetCartShow, statusSetCartView })



class PageWrapper extends Component<any, any> {

	closeModal = () => {
		console.log('PageWrapper Click')
		if (this.props.currencyIsShow || this.props.cartIsShow) {
			this.props.statusSetCurrencyIsShow(false);
			this.props.statusSetCartShow(false);
			this.props.statusSetCartView(true);

		}
	}
	render() {
		console.log('!!!render PageWrapper');
		console.log(this.props.cart)
		const { cartIsShow, currencyIsShow, cartIsModal } = this.props
		return (
			<div className={styles.container} onClick={() => this.closeModal()}>
				<header className={styles.header}>
					<div className={styles.content}>
						<CategoryMenu />
						<Logo />
						<ActionMenu />
						{currencyIsShow && <CurrencyModal />}
					</div>
				</header>
				{cartIsShow && cartIsModal && <Cart modal={true} />}

				{/* {cartIsShow && cartIsModal && <div className={styles.cartOverlay} ></div>} */}
				<div className={styles.childContainer}>
					<div className={styles.child}>
						{(cartIsShow && !cartIsModal) ? <Cart onClose={this.closeModal} /> : this.props.children}
					</div>

				</div>
			</div>

		);
	}
}
export default connector(PageWrapper);
