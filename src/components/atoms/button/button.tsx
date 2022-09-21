import { MouseEvent, Component, ReactNode } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'

type ButtonTypeE = 'green' | 'transparent' | 'black';

type OwnProps = {
	children?: ReactNode | string;
	variant?: ButtonTypeE;
	className?: string;
	disabled?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

class Button extends Component<OwnProps> {

	render(): JSX.Element {
		const {
			children,
			variant = 'green',
			className,
			disabled,
			onClick,
		} = this.props;
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
			>
				{children}
			</button>
		)
	}
}
export default Button;
