import { Component, ReactNode } from 'react';

import ProductCard from '../../molecules/product-card/product-card';

import styles from './style.module.scss'


interface PropsI {
	children?: ReactNode | string;
}

interface StateI { }

class ProductsList extends Component<PropsI, StateI> {
	render() {

		return (
			<div className={styles.productsContainer}>
				<h2 className={styles.category}>Category name</h2>
				<div className={styles.productList}>
					<ProductCard />
					<ProductCard />
					<ProductCard disable />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
			</div>
		);
	}
}
export default ProductsList;
