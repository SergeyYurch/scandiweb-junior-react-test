import { Component, ReactNode } from 'react';
import { withRouter } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';

import ProductCard from '../../molecules/product-card/product-card';
import { getCategorySet } from '../../../store/dataSlice.js';
import { RootState } from '../../../store';
import Spinner from '../../molecules/spinner/spinner';
import ErrorMessageIcon from '../../molecules/error-message/error-message';
import { withAddToCart } from '../../../hoc/with-add-to-cart'

import styles from './style.module.scss'

const mapState = (state: RootState) => ({
	statusFetching: state.data.statusFetchingCategory,
	categorySet: state.data.categorySet,
	currency: state.status.currency,
})

const connector = connect(mapState, { getCategorySet })

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {

}

class ProductsList extends Component<any, any> {

	componentDidMount() {
		const category = this.props.match.params.category;
		this.props.getCategorySet(category);
	}

	render() {
		const { statusFetching, categorySet, currency, addToCart } = this.props;
		const categoryName: string = this.props.match.params.category;
		const printCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
		let productCards: JSX.Element[] = [];
		if (currency && categorySet && categorySet.length > 0) {
			productCards = categorySet.map((p: any) =>
				<ProductCard
					key={p.id}
					addToCart={addToCart}
					category={categoryName}
					currency={currency}
					product={{ ...p }}
				/>)
		}

		return (
			<div className={styles.productsContainer}>
				<h2 className={styles.category}>{printCategoryName}</h2>


				<div className={styles.productList}>

					{statusFetching === 'loading' && <Spinner />}
					{statusFetching === 'error' && <ErrorMessageIcon />}
					{statusFetching === 'idle' && productCards}
				</div>
			</div>
		);
	}
}

export default connector(withRouter(withAddToCart(ProductsList)));
