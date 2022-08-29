import { Component } from 'react';
import cn from 'classnames';


import Button from '../../atoms/button/button';
import ColorFrame from '../color-frame/color-frame';
import PriceFrame from '../price-frame/price-frame';
import NameFrame from '../name-frame/name-frame';
import SizeFrame from '../size-frame/size-frame';
import { ReactComponent as Inc } from '../../../icons/inc.svg';
import { ReactComponent as Dec } from '../../../icons/dec.svg';

import styles from './style.module.scss'
import Carousel from '../carousel/carousel';


interface PropsI {
	modal?: boolean;
}

interface StateI { }

class CartProductCard extends Component<PropsI, StateI> {
	render() {
		const { modal } = this.props;
		return (
			<div className={cn(styles.cartProductCard, { [styles['modal']]: modal })}>
				<div className={styles.productDetails}>
					<NameFrame className={styles.name} variant={modal ? 'small' : 'big'} />
					<PriceFrame size={modal ? 'small' : 'large'} bold={!modal} className={styles.price} >$52</PriceFrame>
					<SizeFrame modal={modal} className={styles.size} />
					<ColorFrame modal={modal} className={styles.color} />
				</div>
				<div className={styles.countControl}>
					<Button className={styles.countBtn} variant='transparent'>
						<Inc className={styles.btnCountIcon} />
					</Button>
					<div className={styles.count}>3</div>
					<Button className={styles.countBtn} variant='transparent'>
						<Dec className={styles.btnCountIcon} />
					</Button>
				</div>
				<div className={styles.imgContainer}>

					<Carousel modal={modal} />

				</div>

			</div >
		);
	}
}
export default CartProductCard;
