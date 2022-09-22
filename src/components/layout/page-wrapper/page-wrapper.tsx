import { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Logo from '../../atoms/logo/logo';
import ActionMenu from '../../molecules/action-menu/action-menu';
import CategoryMenu from '../../molecules/category-menu/category-menu';
import CurrencyModal from '../../molecules/currency-modal/currency-modal';
import Cart from '../../pages/cart/cart';

import { RootState } from '../../../store';
import { statusSetCartShow, statusSetCurrencyIsShow, statusSetCartView } from '../../../store/statusSlice';

import styles from './style.module.scss'
import ErrorBoundary from '../../error-boundary/error-boundary';


const mapState = (state: RootState) => ({
	currencyIsShow: state.status.currencyIsShow,
	cartIsShow: state.status.cartIsShow,
	cartIsModal: state.status.cartIsModal,
})

const connector = connect(mapState, { statusSetCurrencyIsShow, statusSetCartShow, statusSetCartView })

type PropsFromRedux = ConnectedProps<typeof connector>
type OwnProps = {
	children?: ReactNode;
}
type Props = PropsFromRedux & OwnProps

class PageWrapper extends Component<Props, RootState> {
	closeModal = (): void => {
		if (this.props.currencyIsShow || this.props.cartIsShow) {
			this.props.statusSetCurrencyIsShow(false);
			this.props.statusSetCartShow(false);
			this.props.statusSetCartView(true);
		}
	}

	render(): JSX.Element {
		const { cartIsShow, currencyIsShow, cartIsModal } = this.props
		return (
			<ErrorBoundary>
				<div className={styles.container} onClick={() => this.closeModal()}>
					<header className={styles.header}>
						<div className={styles.content}>
							<CategoryMenu />
							<Logo />
							<ActionMenu />
							{currencyIsShow && <CurrencyModal />}
						</div>
					</header>

					{cartIsShow && cartIsModal && <Cart modal={true} />}

					<div className={styles.childContainer}>
						<div className={styles.child}>
							{(cartIsShow && !cartIsModal) ? <Cart /> : this.props.children}
						</div>
					</div>
				</div>
			</ErrorBoundary>
		);
	}
}
export default connector(PageWrapper);
