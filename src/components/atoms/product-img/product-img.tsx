import React, { Component } from 'react';

import cn from 'classnames';

import styles from './style.module.scss'


export interface ButtonPropsI {
	className?: string;
	disable?: boolean;
}


class ProductImg extends Component<ButtonPropsI> {

	render() {
		const { className, disable } = this.props;
		return (
			<figure className={cn(styles.imgContainer, className, { [styles["disable"]]: disable })}>
				<img className={styles.mainImg} src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product" />
			</figure>
		);
	}
}
export default ProductImg;
