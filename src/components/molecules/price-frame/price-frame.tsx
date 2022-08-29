import { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'

interface PropsI {
	children?: string;
	className?: string;
	showLabel?: boolean;
	bold?: boolean;
	size?: "small" | 'middle' | 'large';
	disable?: boolean;
}

interface StateI { }

class PriceFrame extends Component<PropsI, StateI> {
	render() {
		const {
			children,
			className,
			showLabel,
			bold,
			disable,
			size = 'large'
		} = this.props;
		return (
			<div className={
				cn(
					styles.priceContainer,
					className
				)
			}>
				{showLabel && <p className={styles.label}>Price</p>}
				<p className={
					cn(
						styles.priceValue,
						className,
						{
							[styles[size]]: size,
							[styles['bold']]: bold,
							[styles['disable']]: disable
						}
					)
				}>
					{children}
				</p>
			</div >
		);
	}
}
export default PriceFrame;
