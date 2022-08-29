import { Component } from 'react';
import ProductImg from '../../atoms/product-img/product-img';
import NameFrame from '../name-frame/name-frame';
import PriceFrame from '../price-frame/price-frame';



import styles from './style.module.scss'


interface PropsI {
	disable?: boolean;
}

interface StateI { }

class ProductCard extends Component<PropsI, StateI> {
	render() {
		const { disable } = this.props
		return (
			<div className={styles.cardContainer}>
				<ProductImg disable={disable} />
				<div className={styles.description}>
					<NameFrame disable={disable} variant='horizontal' />
					<PriceFrame disable={disable} size='small'>$ 200</PriceFrame>
				</div>
			</div>
		);
	}
}
export default ProductCard;
