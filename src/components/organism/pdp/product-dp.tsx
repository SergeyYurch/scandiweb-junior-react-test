import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import dompurify from 'dompurify';

import { RootState } from '../../../store';
import { getProduct } from '../../../store/dataSlice'

import Spinner from '../../molecules/spinner/spinner';
import ErrorMessageIcon from '../../molecules/error-message/error-message';
import ProductDPView from './product-dp-view';
import { addProductToCart, updateProductInCart } from '../../../store/cartSlice';
import { Attribute } from './../../../store/data.types';
import { withAddToCart } from '../../../hoc/with-add-to-cart';

const mapState = (state: RootState) => ({
	thisProduct: state.data.product,
	statusFetchingProduct: state.data.statusFetchingProduct,
	currency: state.status.currency,
})
const connector = connect(mapState, { getProduct, addProductToCart, updateProductInCart })

class ProductDP extends Component<any, any> {
	state = {
		activeImg: 'img',
		attributes: {}
	}

	componentDidMount = (): void => {
		const id = this.props.match.params.id
		this.props.getProduct(id)
	}

	onChangeImg = (activeImg: string) => {
		this.setState({ activeImg })
	}

	onSelectAttr = (attr: { [id: string]: Attribute }): void => {
		this.setState((state) => {
			return { attributes: { ...state.attributes, ...attr } }
		})
	}

	toCleanDescription = (description: string): { __html: string } => {
		const cleanDescriprion = dompurify.sanitize(description, { FORCE_BODY: true })
		return ({ __html: cleanDescriprion })
	}

	onAddToCart = () => {
		this.props.addToCart(this.state.attributes, this.props.thisProduct.id)
	}

	render() {
		const { statusFetchingProduct, thisProduct, currency } = this.props
		const cleanDescriprion = this.toCleanDescription(thisProduct.description)
		return (
			<>
				{statusFetchingProduct === 'loading' && <Spinner />}
				{statusFetchingProduct === 'error' && <ErrorMessageIcon />}
				{statusFetchingProduct === 'idle' &&
					< ProductDPView
						product={thisProduct}
						currency={currency}
						cleanDescriprion={cleanDescriprion}
						activeImg={this.state.activeImg}
						onAddToCart={this.onAddToCart}
						onSelectAttr={this.onSelectAttr}
						onChangeImg={this.onChangeImg}
					/>}
			</>
		);
	}
}
export default connector(withRouter(withAddToCart(ProductDP)));
