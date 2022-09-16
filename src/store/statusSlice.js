import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	loadingProducts: 'idle',
	loadingMenu: false,
	loadingCurrency: false,
	category: '',
	currency: '',
	cartIsModal: true,
	currencyIsShow: false,
	cartIsShow: false,
}

export const statusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		statusFetching: (state => { state.loadingProducts = 'loading' }),
		statusFeatched: (state) => { state.loadingProducts = 'idle' },
		statusFetchingError: (state) => { state.loadingProducts = 'error' },
		statusChangeCategory: (state, action) => { state.category = action.payload },
		statusCategoryFetching: (state) => { state.loadingMenu = true },
		statusSetCartShow: (state, action) => { state.cartIsShow = action.payload },
		statusSetCartView: (state, action) => { state.cartIsModal = action.payload },
		statusSetCurrencyIsShow: (state, action) => { state.currencyIsShow = action.payload },
		statusSetCurrency: (state, action) => { state.currency = action.payload },
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

const { actions, reducer } = statusSlice
export default reducer;
export const {
	statusFetching,
	statusFeatched,
	statusFetchingError,
	statusChangeCategory,
	statusCategoryFetching,
	statusSetCartShow,
	statusSetCurrencyIsShow,
	statusSetCurrency,
	statusSetCartView
} = actions;