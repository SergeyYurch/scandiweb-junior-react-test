import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as ApiServices from '../sevices/api-services'
import { statusSlice, statusSetCurrency } from './statusSlice'


export const getCategoriesData = createAsyncThunk(
	'data/getCategoriesData',
	async () => await ApiServices.getCategories()
);

export const getCategoriesName = createAsyncThunk(
	'data/getCategoriesName',
	async () => await ApiServices.getCategories()
);

export const getCategorySet = createAsyncThunk(
	'data/getCategorySet',
	async (category) => {
		const res = await ApiServices.getCategory(category)
		return res.category.products
	}
);

export const getProduct = createAsyncThunk(
	'data/getProduct',
	async (id) => await ApiServices.getProduct(id)
);


export const getCurrencies = createAsyncThunk(
	'data/getCurrencies',
	async (arg, thunkAPI) => {
		const data = await ApiServices.getCurrencies()
		thunkAPI.dispatch(statusSetCurrency(data.currencies[0]))
		return data
	}

);



const initialState = {
	statusFetchingName: 'loading',
	statusFetchingCategory: 'loading',
	statusFetchingProduct: 'loading',
	statusFetchingCurrencies: 'loading',
	currentCategory: '',
	categories: [],
	categorySet: [],     //products: []
	product: {},
	currencies: []
}
export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setCurrentCategory: (state, action) => {
			state.currentCategory = action.payload
		}
		// 	state.categories = action.payload
		// 	console.log('Run dataCategoriesLoad')
		// },
		// dataCategoryLoad: (state, action) => { state.category = action.payload },
		// dataCurrencyLoad: (state, action) => { state.currency = action.payload },
		// test: (state) => {
		// 	console.log('test')
		// 	state.test = 'test'
		// }
	},
	extraReducers: {


		[getCategoriesData.pending]: state => { state.statusFetching = 'loading' },
		[getCategoriesData.rejected]: state => { state.statusFetching = 'error' },
		[getCategoriesData.fulfilled]: (state, action) => { state.categorySet = action.payload.categories.map(el => el) },

		[getCategoriesName.pending]: state => { state.statusFetchingName = 'loading' },
		[getCategoriesName.rejected]: state => { state.statusFetchingName = 'error' },
		[getCategoriesName.fulfilled]: (state, action) => {
			state.statusFetchingName = 'idle'
			state.categories = action.payload.categories.map(el => el.name)
		},
		[getCategorySet.pending]: state => { state.statusFetchingCategory = 'loading' },
		[getCategorySet.rejected]: state => { state.statusFetchingCategory = 'error' },
		[getCategorySet.fulfilled]: (state, action) => {
			state.statusFetchingCategory = 'idle'
			state.categorySet = action.payload
		},

		[getProduct.pending]: state => { state.statusFetchingProduct = 'loading' },
		[getProduct.rejected]: state => { state.statusFetchingProduct = 'error' },
		[getProduct.fulfilled]: (state, action) => {
			state.statusFetchingProduct = 'idle'
			state.product = action.payload.product
		},

		[getCurrencies.pending]: state => { state.statusFetchingCurrencies = 'loading' },
		[getCurrencies.rejected]: state => { state.statusFetchingCurrencies = 'error' },
		[getCurrencies.fulfilled]: (state, action) => {
			state.currencies = action.payload.currencies
			state.statusFetchingCurrencies = 'idle'
		},



	},
	devTools: process.env.NODE_ENV !== 'production',
})

export const { setCurrentCategory } = dataSlice.actions;
export default dataSlice.reducer;
