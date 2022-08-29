import { Component, ReactNode } from 'react';
import { ReactComponent as Arrow } from '../../../icons/arrow-down.svg';

import styles from './style.module.scss'


interface PropsI {
	children?: ReactNode | string;
}

interface StateI { }

class CurrensyButton extends Component<PropsI, StateI> {
	render() {

		return (
			<button className={styles.currencyButton}>
				<span>$</span>
				<Arrow />
			</button>
		);
	}
}
export default CurrensyButton;
