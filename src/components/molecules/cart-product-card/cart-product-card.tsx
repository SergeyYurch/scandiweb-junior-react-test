import { Component } from 'react';
import cn from 'classnames';

import { Attribute, AttributeSet, Product } from '../../../store/data.types';

import Button from '../../atoms/button/button';
import AttributeFrame from '../attribute-frame/attribute-frame';
import PriceFrame from '../price-frame/price-frame';
import NameFrame from '../name-frame/name-frame';
import { ReactComponent as Inc } from '../../../icons/inc.svg';
import { ReactComponent as Dec } from '../../../icons/dec.svg';

import styles from './style.module.scss'
import Carousel from '../carousel/carousel';


interface PropsI {
	modal?: boolean;

}

interface StateI { }

class CartProductCard extends Component<any, StateI> {


	onUpdateProductCount = (value) => {
		const { count, id } = this.props.cartProduct
		this.props.onUpdateProductCount(id, count, value)
	}

	render() {
		const { modal, cartProduct, price: priceFromCart, className } = this.props;
		const { id: idInCart, count, selectedAttr, product, } = cartProduct;
		const { id, name, inStock, gallery, description, category, attributes, prices, brand } = product;
		let gallerySet: JSX.Element[] = [];
		let attributesSet: JSX.Element[] = [];
		let price: string = '';
		price = priceFromCart.currency.symbol + priceFromCart.amount
		if (attributes && attributes.length > 0) {
			attributesSet = attributes.map((attr: AttributeSet, i: number) => {
				const attrId = attr.id
				const initialAttr = selectedAttr[attrId]
				return (
					<AttributeFrame key={i} disabled modal={modal} attributes={attr} initialAttr={initialAttr} />
				)
			})
		}

		return (
			<div className={cn(styles.cartProductCard, className, { [styles['modal']]: modal })}>


				<div className={styles.productDetails}>
					<PriceFrame bold className={styles.price} price={price} size={modal ? 'small' : 'large'} />

					<NameFrame className={styles.name} variant={modal ? 'small' : 'big'} name={name} brand={brand} />
					{attributesSet}
				</div>



				<div className={styles.countControl}>
					<Button className={styles.countBtn} onClick={() => this.onUpdateProductCount(1)} variant='transparent'>
						<Inc className={styles.btnCountIcon} />
					</Button>
					<div className={styles.count}>{count}</div>
					<Button className={styles.countBtn} onClick={() => this.onUpdateProductCount(-1)} variant='transparent'>
						<Dec className={styles.btnCountIcon} />
					</Button>
				</div>
				<div className={styles.imgContainer}>

					<Carousel modal={modal} gallery={gallery} name={name} />

				</div>

			</div >
		);
	}
}
export default CartProductCard;
