import { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'


interface PropsI {
	className?: string;
	variant?: 'small' | 'big' | 'horizontal';
	disable?: boolean;
	modal?: boolean;
}

interface StateI { }

class NameFrame extends Component<PropsI, StateI> {
	render() {
		const {
			className,
			variant = 'big',
			disable,
		} = this.props;
		return (
			<div className={
				cn(
					styles.nameContainer,
					className,
					{
						[styles[variant]]: variant,
						[styles['disable']]: disable
					})}>
				<h3 className={styles.brandProduct}>
					Apollo
				</h3 >
				<p className={styles.nameProduct}>
					Running shot
				</p>
			</div>
		);
	}
}
export default NameFrame;
