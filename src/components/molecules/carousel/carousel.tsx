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
	gallery: string[];

}

interface StateI { }

class Carousel extends Component<any, any> {
	state = {
		currentImg: 0
	}
	changeImg = (direction: 'right' | 'left') => {
		const lengthGallery = this.props.gallery.length
		if (direction === 'right') {
			this.setState((state) => {
				let newImgIndex = this.state.currentImg + 1;
				if (newImgIndex === lengthGallery) newImgIndex = 0;
				return { currentImg: newImgIndex }
			})
		}

		if (direction === 'left') {
			this.setState((state) => {
				let newImgIndex = this.state.currentImg - 1;
				if (newImgIndex < 0) newImgIndex = lengthGallery - 1;
				return { currentImg: newImgIndex }
			})
		}


	}
	render() {
		const {
			modal,
			className,
			gallery,
			onClick,
			name,
			...props } = this.props;

		return (
			<div
				className={cn(
					styles.carousel,
					className,
				)}
				{...props}
			>
				<figure className={styles.imgContainer}>
					<img src={gallery[this.state.currentImg]} alt="{name}" />
				</figure>
				{!modal && gallery.length > 1 &&
					<div className={styles.control}>
						<Button className={styles.btn} onClick={() => this.changeImg('left')} variant='black' >
							<ArrowLeft />
						</Button>
						<Button className={styles.btn} onClick={() => this.changeImg('right')} variant='black' >
							<ArrowRight />
						</Button>
					</div>
				}


			</div>
		);
	}
}
export default Carousel;
