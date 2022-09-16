import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';
import PropTypes from "prop-types";

import PageWrapper from './components/layout/page-wrapper/page-wrapper';
import Spinner from './components/molecules/spinner/spinner';
import ErrorMessageIcon from './components/molecules/error-message/error-message';
import ProductsList from './components/organism/products-list/product-list';

import ProductDP from './components/organism/pdp/product-dp';
import CartProductCard from './components/molecules/cart-product-card/cart-product-card';

import { getCategoriesData, getCategoriesName, getCategorySet, getCurrencies } from './store/dataSlice.js';
import { RootState } from './store/index.js';

import './App.css';

const mapState = (state: RootState) => ({
	categories: state.data.categories,
	activeMenu: state.status.category,
	currencies: state.data.currencies,
	statusFetchingCategory: state.data.statusFetchingCategory,
	statusFetchingProduct: state.data.statusFetchingProduct,
	statusFetchingCurrencies: state.data.statusFetchingCurrencies
})

const connector = connect(mapState, { getCategorySet, getCategoriesData, getCategoriesName, getCurrencies })

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {

}

class App extends Component<any, Props> {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	componentDidMount() {
		console.log('---App did mount')
		this.props.getCategoriesName();
		this.props.getCurrencies();

	}

	render() {
		console.log('!!!render app');
		return (
			<Switch>
				<Route exact path='/'>
					<PageWrapper />
				</Route>
				<Route exact path='/:category'>
					<PageWrapper >
						< ProductsList />
					</PageWrapper >
				</Route>

				<Route exact path='/:category/:id' >
					<PageWrapper >
						<ProductDP />
					</PageWrapper >
				</Route>

			</Switch>
		);
	}
}

export default connector(withRouter(App));
