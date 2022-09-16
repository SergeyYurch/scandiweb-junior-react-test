import React, { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'


export interface ButtonPropsI {
	className?: string;
	disable?: boolean;
	src: string;
	alt: string;
}


class ProductImg extends Component<ButtonPropsI> {

	render() {
		const { className, disable, src, alt } = this.props;
		return (
			<figure className={cn(styles.imgContainer, className, { [styles["disable"]]: disable })}>
				<img className={styles.mainImg} src={src} alt={alt} />
			</figure>
		);
	}
}
export default ProductImg;
