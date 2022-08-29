import React, { Component, ReactNode } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'
import Button from '../../atoms/button/button';

interface PropsI {
	children?: ReactNode | string;
	className?: string;
	modal?: boolean;
}

interface StateI { }

class SizeFrame extends Component<PropsI, StateI> {
	render() {
		const { className, modal } = this.props;
		return (
			<div className={cn(styles.sizeContainer, className, { [styles['modal']]: modal })}>
				<p className={styles.label}>Size:</p>
				<div className={styles.btnContainer}>
					<Button variant='transparent' className={styles.sizeBtn}>XS</Button>
					<Button variant='transparent' className={cn(styles.active, styles.sizeBtn)}>S</Button>
					<Button variant='transparent' className={styles.sizeBtn}>M</Button>
					<Button variant='transparent' className={styles.sizeBtn}>L</Button>
				</div>
			</div>
		);
	}
}
export default SizeFrame;
