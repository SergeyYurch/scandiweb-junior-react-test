import { Component, ReactNode } from 'react';
import { ReactComponent as Arrow } from '../../../icons/arrow-down.svg';

import styles from './style.module.scss'


interface PropsI {
	children?: ReactNode | string;
	onCurrencyClick: () => void
	currency: any
}

interface StateI { }

class CurrensyButton extends Component<PropsI, StateI> {
	onCurrencyClick = (e) => {
		e.stopPropagation()
		this.props.onCurrencyClick()
	}
	render() {
		const { currency } = this.props
		return (
			<button onClick={(e) => this.onCurrencyClick(e)} className={styles.currencyButton}>
				<span>{currency.symbol}</span>
				<Arrow />
			</button>
		);
	}
}
export default CurrensyButton;
