import { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'


interface PropsI {
	className?: string;
	variant?: 'small' | 'big' | 'horizontal';
	disable?: boolean;
	modal?: boolean;
	name?: string;
	brand?: string;
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
					{this.props.brand}
				</h3 >
				<p className={styles.nameProduct}>
					{this.props.name}
				</p>
			</div>
		);
	}
}
export default NameFrame;
