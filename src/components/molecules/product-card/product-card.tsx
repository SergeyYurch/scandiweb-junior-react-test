import { Component } from 'react';
import { Link } from 'react-router-dom';


import ProductImg from '../../atoms/product-img/product-img';
import NameFrame from '../name-frame/name-frame';
import PriceFrame from '../price-frame/price-frame';




import styles from './style.module.scss'
import CartAddButton from './../../atoms/cart-add-button/cart-add-button';



interface PropsI {
	product: any;
	currency: any
	category?: string;
	addToCart?: ''//
}

interface StateI { }

class ProductCard extends Component<any, StateI> {

	onAddCartClick = () => {
		console.log('Add to Cart');
		this.props.addToCart({}, this.props.product.id)
	}

	render() {
		console.log('!Render ProductCard')
		const { id, name, inStock, gallery, prices, brand, attributes } = this.props.product
		const srcImg = gallery[0];
		const { category } = this.props

		const priceCurr = prices.find((p) => p.currency.label === this.props.currency.label)
		const price = priceCurr.currency.symbol + priceCurr.amount

		return (
			<div className={styles.container}>
				{(!attributes || attributes.length === 0) && inStock && <CartAddButton className={styles.addCartBtn} disabled={!inStock} onAddCartClick={this.onAddCartClick} />}
				<Link to={`/${category}/${id}`} className={styles.link}>
					<div className={styles.cardContent}>
						<ProductImg disable={!inStock} src={srcImg} alt={name} />
						<div className={styles.description}>
							<NameFrame disable={!inStock} variant='horizontal' name={name} brand={brand} />
							<PriceFrame disable={!inStock} size='small' price={price} />
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
export default ProductCard;
