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
			onClick,
			...props } = this.props;
		return (
			<button
				disabled={disabled}
				className={cn(
					styles.btn,
					className,
					{
						[styles.dissabledSt]: disabled,
						[styles[variant]]: variant,
					})
				}
				onClick={onClick}
				{...props}
			>
				{children}
			</button>
		);
	}
}
export default Button;
