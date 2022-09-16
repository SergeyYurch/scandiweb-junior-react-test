import { Component } from 'react';

import { generateId } from './../../../helpers/helpers';
import { Attribute, AttributeSet } from '../../../store/data.types';

import Button from '../../atoms/button/button';
import AttributeFrame from '../../molecules/attribute-frame/attribute-frame';
import PriceFrame from '../../molecules/price-frame/price-frame';
import NameFrame from '../../molecules/name-frame/name-frame';
import ProductImg from '../../atoms/product-img/product-img';

import styles from './style.module.scss'

interface StateI {
	activeImg: string;
	sizeVolume: string;
	colorVolume: string;
	attributes: { id: string, attribute: Attribute }[];
}




class ProductDPView extends Component<any, any> {

	componentDidMount = () => {
		if (this.props.product && this.props.product.length !== 0) {
			const { gallery } = this.props.product
			this.onChangeImg(gallery[0])
		}
	}

	onChangeImg = (activeImg: string) => {
		this.props.onChangeImg(activeImg)
	}

	render() {
		const { product, currency, activeImg, cleanDescriprion } = this.props
		const { name, inStock, gallery, attributes, prices, brand } = product
		let price = '$100';
		let gallerySet: JSX.Element[] = [];
		let attributesSet: JSX.Element[] = [];

		if (prices && currency) {
			const priceCurr = prices.find((p) => p.currency.label === currency.label)
			price = priceCurr.currency.symbol + priceCurr.amount
		}

		if (attributes && attributes.length > 0) {
			attributesSet = attributes.map((attr: AttributeSet, i: number) => {
				return (
					<AttributeFrame key={i} onSelectAttr={this.props.onSelectAttr} attributes={attr} />
				)
			})
		}

		if (gallery) {
			gallerySet = gallery.map((el: string, i: number): JSX.Element => {
				return (
					<button key={i} className={styles.galleryItem} onClick={() => this.props.onChangeImg(el)} >
						<ProductImg src={el} alt={name} />
					</button>
				)
			})
		}

		return (
			<div className={styles.containerPDP}>
				<div className={styles.gallery}>
					{gallerySet}
				</div>
				<div className={styles.productDetailCard} >
					{gallery && (
						<figure className={styles.productImg}>
							<img src={activeImg} alt="name" />
						</figure>
					)}
					<div className={styles.productDetails}>
						<NameFrame className={styles.name} variant='big' name={name} brand={brand} />
						{attributesSet}
						<PriceFrame showLabel bold className={styles.price} price={price} />
						<Button className={styles.addToCartBtn} disabled={!inStock} onClick={this.props.onAddToCart}>ADD TO CART</Button>
						<div className={styles.description} dangerouslySetInnerHTML={cleanDescriprion}>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

export default ProductDPView;

