import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';


import CartButton from '../cart-button/cart-button';
import CurrencyButton from '../../atoms/currency-button/currency-button';

import styles from './style.module.scss'
import { RootState } from '../../../store';
import { statusSetCurrencyIsShow, statusSetCartShow } from '../../../store/statusSlice';
import { statusSetCurrency } from '../../../store/statusSlice'


const mapState = (state: RootState) => ({
	quantity: state.cart.quantity,
	cartState: state.cart,
	currencyIsShow: state.status.currencyIsShow,
	cartIsShow: state.status.cartIsShow,
	currency: state.status.currency,
	statusFetchingCurrencies: state.data.statusFetchingCurrencies,
	currencies: state.data.currencies,

})

const connector = connect(mapState, { statusSetCurrencyIsShow, statusSetCartShow, statusSetCurrency })

class ActionMenu extends Component<any, any> {
	componentDidMount(): void {
		if (this.props.statusFetchingCurrencies === 'idle' && this.state.currencies) {
			console.log('ActionMenu set currency');
			debugger
			const currency = this.state.currencies[0]
			this.props.statusSetCurrency(currency)
		}
	}

	onCartClick = () => {
		if (this.props.quantity === 0) return;
		this.props.cartIsShow ? this.props.statusSetCartShow(false) : this.props.statusSetCartShow(true)
	}

	onCurrencyClick = () => {
		console.log(this.props.currencyIsShow)
		this.props.currencyIsShow ? this.props.statusSetCurrencyIsShow(false) : this.props.statusSetCurrencyIsShow(true)
	}


	render() {
		const { quantity, currency } = this.props
		return (
			<div className={styles.actionWrapper} >
				<CurrencyButton onCurrencyClick={this.onCurrencyClick} currency={currency} />
				<CartButton quantity={quantity} onCartClick={this.onCartClick} />
			</div>
		);
	}
}
export default connector(ActionMenu);
