import React, { Component, ReactNode } from 'react';
import Button from '../../atoms/button/button';
import ColorFrame from '../../molecules/color-frame/color-frame';
import PriceFrame from '../../molecules/price-frame/price-frame';
import NameFrame from '../../molecules/name-frame/name-frame';
import SizeFrame from '../../molecules/size-frame/size-frame';

import styles from './style.module.scss'


interface PropsI {
	children?: ReactNode | string;
}

interface StateI { }

class ProductDP extends Component<PropsI, StateI> {
	render() {

		return (
			<div className={styles.containerPDP}>

				<div className={styles.gallery}>
					<div className={styles.galleryItem}>
						<img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product" />
					</div>
					<div className={styles.galleryItem}>
						<img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product" />
					</div>
					<div className={styles.galleryItem}>
						<img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product" />
					</div>
				</div>

				<div className={styles.productDetailCard} >
					<figure className={styles.productImg}>
						<img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product" />
					</figure>
					<div className={styles.productDetails}>
						<NameFrame className={styles.name} variant='big' />
						<SizeFrame className={styles.syze} />
						<ColorFrame className={styles.color} />
						<PriceFrame showLabel bold className={styles.price} />
						<Button className={styles.addToCartBtn}>ADD TO CART</Button>
						<p className={styles.description}>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem eligendi illo facilis cumque, et rerum sit, neque nemo aliquid quisquam at rem? Inventore ut nostrum minus impedit eos, tempora odit.
						</p>
					</div>
				</div>

			</div >
		);
	}
}
export default ProductDP;
