import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Currency } from './../types/data.types';

interface StatusState {
	// loadingMenu: boolean;
	// loadingCurrency: boolean;
	category: string;
	currency: Currency;
	cartIsModal: boolean;
	currencyIsShow: boolean;
	cartIsShow: boolean;
}

const initialState: StatusState = {
	// loadingMenu: false,
	// loadingCurrency: false,
	category: '',
	currency: { label: 'USD', symbol: '$' },
	cartIsModal: true,
	currencyIsShow: false,
	cartIsShow: false,
}

export const statusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		statusChangeCategory: (state, action: PayloadAction<string>) => { state.category = action.payload },
		// statusCategoryFetching: (state) => { state.loadingMenu = true },
		statusSetCartShow: (state, action: PayloadAction<boolean>) => { state.cartIsShow = action.payload },
		statusSetCartView: (state, action: PayloadAction<boolean>) => { state.cartIsModal = action.payload },
		statusSetCurrencyIsShow: (state, action: PayloadAction<boolean>) => { state.currencyIsShow = action.payload },
		statusSetCurrency: (state, action: PayloadAction<Currency>) => { state.currency = action.payload },
	}
})

const { actions, reducer } = statusSlice
export default reducer;
export const {
	statusChangeCategory,
	// statusCategoryFetching,
	statusSetCartShow,
	statusSetCurrencyIsShow,
	statusSetCurrency,
	statusSetCartView
} = actions;