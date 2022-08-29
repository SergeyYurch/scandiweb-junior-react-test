import React, { Component, ReactNode } from 'react';

import Logo from '../../atoms/logo/logo';
import ActionMenu from '../../molecules/action-menu/action-menu';
import CategoryMenu from '../../molecules/category-menu/category-menu';
import CurrencyModal from '../../molecules/currency-modal/currency-modal';
import Cart from '../../organism/cart/cart';

import styles from './style.module.scss'


interface PropsI {
	children?: ReactNode | string;
}

interface StateI { }

class PageWrapper extends Component<PropsI, StateI> {
	render() {

		return (
			<div className={styles.container}>
				<header className={styles.header}>
					<CategoryMenu />
					<Logo />
					<ActionMenu />
					{/* <Cart modal /> */}
					{/* <CurrencyModal /> */}

				</header>
				{this.props.children}
			</div >
		);
	}
}
export default PageWrapper;
