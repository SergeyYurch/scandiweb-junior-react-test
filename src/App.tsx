import React, { Component, ReactNode } from 'react';

import QueryServices from './sevices/query-services.js';
import PageWrapper from './components/layout/page-wrapper/page-wrapper';
import Spinner from './components/molecules/spinner/spinner';
import ErrorMessageIcon from './components/molecules/error-message/error-message';
import ProductsList from './components/organism/products-list/product-list';

import ProductDP from './components/organism/pdp/product-dp';
import CartProductCard from './components/molecules/cart-product-card/cart-product-card';
import Cart from './components/organism/cart/cart';

import './App.css';


interface PropsI {
	children?: ReactNode;
}

interface StateI {
	loading: boolean
}

class App extends Component<PropsI, StateI> {
	state = {
		loading: false
	}
	componentDidMount() {
		const queryService = new QueryServices();
		queryService.getProduct('huarache-x-stussy-le').then((data) => console.log(data));

	}
	render() {


		return (
			<PageWrapper>
				{/* <Spinner /> */}
				{/* <ErrorMessageIcon /> */}
				<ProductsList />
				{/* <ProductDP /> */}
				{/* <Cart /> */}
			</PageWrapper>
		);
	}
}

export default App;
