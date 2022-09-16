import { Component } from 'react';
import { connect } from 'react-redux';

import * as ApiServices from '../sevices/api-services'
import { RootState } from '../store';
import { getProduct } from '../store/dataSlice'
import { generateId } from '../helpers/helpers'
import { addProductToCart, updateProductInCart } from '../store/cartSlice';


export const withAddToCart = (InputComponent) => {

	class WithAddToCart extends Component<any, any> {

		addToCart = async (attr, idProd) => {
			const productsFromDB = await ApiServices.getProduct(idProd);
			const productInput = productsFromDB.product
			const id = generateId();
			const productToCart = {
				id: id,
				count: 1,
				product: productInput,
				selectedAttr: attr
			}
			const productsInCart = [...this.props.productsInCart]
			if (productsInCart && productsInCart.length === 0) {
				this.props.addProductToCart(productToCart);
			} else {
				const prodSameName = productsInCart.filter((prodIn) => prodIn.product.id === productInput['id'])
				if (prodSameName.length === 0) {
					this.props.addProductToCart(productToCart)
				} else {
					let isExistInCart = false;
					prodSameName.forEach((prodIn) => {
						const attrInCart = prodIn.selectedAttr
						const attrToCart = attr
						let arrOfAttrInCart = [];
						let strAttrToCart = [];
						for (let key in attrInCart) {
							arrOfAttrInCart.push(JSON.stringify(attrInCart[key]))
							strAttrToCart.push(JSON.stringify(attrToCart[key]))
						}
						const isEqual = (arrOfAttrInCart.join('') === strAttrToCart.join(''))
						if (isEqual) {
							isExistInCart = true;
							console.log('increnment')
							this.props.updateProductInCart({ id: prodIn.id, value: 1 })
							return
						}
					})
					if (!isExistInCart) {
						this.props.addProductToCart(productToCart)
					}
				}
			}
		}
		render() {
			return (
				<InputComponent addToCart={this.addToCart} {...this.props} />
			);
		}
	}

	const mapState = (state: RootState) => ({
		productsInCart: state.cart.products,
	})
	const connector = connect(mapState, { getProduct, addProductToCart, updateProductInCart })

	return connector(WithAddToCart);
}




