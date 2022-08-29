import React, { MouseEvent, Component, ReactNode } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'
import Button from '../../atoms/button/button';
import { ReactComponent as ArrowRight } from '../../../icons/arrow-right.svg';
import { ReactComponent as ArrowLeft } from '../../../icons/arrow-left.svg';


export type ButtonTypeE =
	| 'size_type'
	| 'green'
	| 'square'
	| 'color_type'
	| 'transparent'



export interface ButtonPropsI {
	modal?: boolean;
	children?: ReactNode | string;
	variant?: ButtonTypeE;
	className?: string;
	disabled?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

}

interface StateI { }

class Carousel extends Component<ButtonPropsI, StateI> {

	render() {
		const {
			modal,
			variant = 'green',
			className,
			onClick,
			...props } = this.props;

		return (
			<div
				className={cn(
					styles.carousel,
					className,
					{
						[styles[variant]]: variant
					})}
				{...props}
			>
				<figure className={styles.imgContainer}>
					<img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product" />
				</figure>
				{!modal &&
					<div className={styles.control}>
						<Button className={styles.btn} variant='black' >
							<ArrowLeft />
						</Button>
						<Button className={styles.btn} variant='black' >
							<ArrowRight />
						</Button>
					</div>
				}


			</div>
		);
	}
}
export default Carousel;
