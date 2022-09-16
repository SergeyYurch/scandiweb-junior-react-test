import React, { Component, MouseEventHandler, ReactNode } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store';
import cn from 'classnames';

import { statusChangeCategory } from '../../../store/statusSlice.js'

import styles from './style.module.scss'
import Spinner from '../spinner/spinner';
import { getCategorySet, setCurrentCategory } from '../../../store/dataSlice';

const mapState = (state: RootState) => ({
	categories: state.data.categories,
	statusFetching: state.data.statusFetchingName,
	currentCategory: state.data.currentCategory
})

const connector = connect(mapState, { getCategorySet, setCurrentCategory })

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {

}



class CategoryMenu extends Component<any, any> {


	componentDidMount(): void {
		console.log('!!! CategoryMenu DidMount')
		const category = this.props.match.params.category
		this.props.setCurrentCategory(category);
	}
	componentDidUpdate(prevProps: any, prevState: any): void {
		// this.props.getCategorySet(category);

	}

	changeMenu = (e: React.MouseEvent<HTMLAnchorElement>, link: string): any => {
		console.log(link)
		if (link !== this.props.currentCategory) {
			this.props.setCurrentCategory(link);
			this.props.getCategorySet(link)
		}


	}

	render() {
		const { categories, statusFetching } = this.props;
		let menu: JSX.Element[] = [];
		if (statusFetching === 'idle') {
			menu = categories.map((el: any, i: number) => {
				const link: string = String(el).toLowerCase();
				return (
					<li key={i}>
						<NavLink to={'/' + link} activeClassName={styles.active} className={styles.item} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => this.changeMenu(e, link)}>
							{el}
						</NavLink >
					</li>
				)
			});
		}

		return (
			<nav className={styles.wrapper} >
				<ul>
					{statusFetching === 'loading' && <span> Loading...</span>}
					{menu}
				</ul>
			</nav >
		);
	}
}

export default connector(withRouter(CategoryMenu));
