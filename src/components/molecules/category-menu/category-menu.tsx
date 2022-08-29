import React, { Component } from 'react';
import styles from './style.module.scss'


class CategoryMenu extends Component {

	render() {

		return (
			<nav className={styles.wrapper}>
				<ul>
					<li className={styles.active}><a href="#">All</a></li>
					<li><a href="#">Clothes</a></li>
					<li><a href="#">Tech</a></li>
				</ul>

			</nav >
		);
	}
}
export default CategoryMenu;
