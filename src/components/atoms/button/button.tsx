import React, { MouseEvent, Component, ReactNode } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'


export type ButtonTypeE =
	| 'size_type'
	| 'green'
	| 'square'
	| 'color_type'
	| 'transparent'
	| 'black'



export interface ButtonPropsI {
	children?: ReactNode | string;
	variant?: ButtonTypeE;
	className?: string;
	disabled?: boolean;
	color?: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

}

interface StateI { }

class Button extends Component<ButtonPropsI, StateI> {

	render() {
		const {
			children,
			variant = 'green',
			className,
			disabled,
			color,
			onClick,
			...props } = this.props;

		return (
			<button
				style={{ backgroundColor: color }}
				disabled
				className={cn(
					styles.btn,
					className,
					{
						[styles[variant]]: variant
					})}
				{...props}
			>
				{children}
			</button>
		);
	}
}
export default Button;
