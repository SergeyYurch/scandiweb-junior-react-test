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

class ColorFrame extends Component<PropsI, StateI> {
	render() {
		const { className, modal } = this.props;
		return (
			<div className={cn(styles.colorContainer, className, { [styles['modal']]: modal })}>
				<p className={styles.label}>Color:</p>
				<div className={styles.btnContainer}>
					<Button className={styles.colorBtn} color={"red"} />
					<Button className={cn(styles.colorBtn, styles.active)} color={"blue"} />
					<Button className={styles.colorBtn} color={"yellow"} />
				</div>
			</div>
		);
	}
}
export default ColorFrame;
