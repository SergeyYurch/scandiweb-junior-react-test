import { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'

interface PropsI {
	className?: string;

}

interface StateI { }

class CurrencyModal extends Component<PropsI, StateI> {
	render() {
		const { className } = this.props;
		return (
			<div className={cn(styles.modalContainer, className)}>
				<p className={styles.item}>$ USD</p>
				<p className={cn(styles.item, styles.active)}>E EUR</p>
				<p className={styles.item}>Y YPG</p>
			</div >
		);
	}
}
export default CurrencyModal;
