import { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { RootState } from '../../../store';

import styles from './style.module.scss'
import { statusSetCurrencyIsShow, statusSetCurrency } from '../../../store/statusSlice';
import { generateId } from './../../../helpers/helpers';

interface PropsI {
	className?: string;

}

interface StateI { }
const mapState = (state: RootState) => ({
	curencyIsShow: state.status.currencyIsShow,
	currency: state.status.currency,
	currencies: state.data.currencies,
})


const connector = connect(mapState, { statusSetCurrencyIsShow, statusSetCurrency })



class CurrencyModal extends Component<any, StateI> {
	componentDidMount(): void {
		console.log('currency did mount');

	}
	setCurrency = (curr) => {
		this.props.statusSetCurrency(curr);
		this.props.statusSetCurrencyIsShow(false);
	}

	closeModal = () => {
		console.log('close modal');
		this.props.statusSetCurrencyIsShow(false);
	}

	render() {
		const { className, currencies, currency } = this.props;
		let currencyItems = [];
		if (currencies) {
			currencyItems = currencies.map((curr) => {
				return (
					<button
						key={generateId()}
						className={cn(styles.item, {
							[styles.active]: curr.label === currency.label
						})}
						onClick={() => this.setCurrency(curr)}
					>
						{`${curr.symbol} ${curr.label}`}
					</button>
				)
			})
		}

		return (
			<div className={cn(styles.modalContainer, className)} onClick={(e) => e.stopPropagation()}>
				{currencyItems}
			</div >
		);
	}
}
export default connector(CurrencyModal);
