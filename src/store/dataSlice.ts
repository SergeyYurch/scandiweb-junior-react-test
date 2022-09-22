import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as ApiServices from '../sevices/api-services'
import { statusSetCurrency } from './statusSlice'
import { Product, Currency } from '../types/data.types'


interface DataState {
	statusFetchingName: string;
	statusFetchingCategory: string;
	statusFetchingProduct: string;
	statusFetchingCurrencies: string;
	currentCategory: string,
	categories: string[],
	categorySet: Product[],
	product: Product,
	currencies: Currency[]
}

interface CategoriesNames {
	categories: {
		name: string;
	}[];
}

interface Currencies {
	currencies: Currency[]
}


export const getCategoriesName = createAsyncThunk<CategoriesNames>(
	'data/getCategoriesName',
	async () => {
		const res = await ApiServices.getCategoriesName()
		return res as CategoriesNames
	}
);

export const getCategorySet = createAsyncThunk<Product[], string, {}>(
	'data/getCategorySet',
	async (category) => {
		const res = await ApiServices.getCategory(category)
		return res as Product[]
	}
);

export const getProduct = createAsyncThunk<Product, string, {}>(
	'data/getProduct',
	async (id: string) => {
		const res = await ApiServices.getProduct(id)
		return res as Product
	}
);


export const getCurrencies = createAsyncThunk<Currencies>(
	'data/getCurrencies',
	async (arg, thunkAPI) => {
		const res = await ApiServices.getCurrencies()
		thunkAPI.dispatch(statusSetCurrency(res.currencies[0]))
		return res as Currencies
	}
);

const initialState: DataState = {
	statusFetchingName: 'loading',
	statusFetchingCategory: 'loading',
	statusFetchingProduct: 'loading',
	statusFetchingCurrencies: 'loading',
	currentCategory: '',
	categories: [],
	categorySet: [],
	product: {
		id: 'none',
		name: 'none',
		inStock: true,
		gallery: [''],
		description: '',
		category: 'All',
		attributes: [],
		prices: [{ currency: { label: 'USD', symbol: '$' }, amount: 0 }],
		brand: 'none'
	},
	currencies: [{ label: 'USD', symbol: '$' }]
}

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setCurrentCategory: (state, action: PayloadAction<string>) => {
			state.currentCategory = action.payload
		}
	},
	extraReducers: (builder) => {
		builder

			.addCase(getCategoriesName.pending, state => { state.statusFetchingName = 'loading' })
			.addCase(getCategoriesName.rejected, state => { state.statusFetchingName = 'error' })
			.addCase(getCategoriesName.fulfilled, (state, action) => {
				state.statusFetchingName = 'idle'
				state.categories = action.payload.categories.map(el => el.name)
			})

			.addCase(getCategorySet.pending, state => { state.statusFetchingCategory = 'loading' })
			.addCase(getCategorySet.rejected, state => { state.statusFetchingCategory = 'error' })
			.addCase(getCategorySet.fulfilled, (state, action) => {
				state.statusFetchingCategory = 'idle'
				state.categorySet = action.payload
			})

			.addCase(getProduct.pending, state => { state.statusFetchingProduct = 'loading' })
			.addCase(getProduct.rejected, state => { state.statusFetchingProduct = 'error' })
			.addCase(getProduct.fulfilled, (state, action) => {
				state.statusFetchingProduct = 'idle'
				state.product = action.payload
			})
			.addCase(getCurrencies.pending, state => { state.statusFetchingCurrencies = 'loading' })
			.addCase(getCurrencies.rejected, state => { state.statusFetchingCurrencies = 'error' })
			.addCase(getCurrencies.fulfilled, (state, action) => {
				state.currencies = action.payload.currencies
				state.statusFetchingCurrencies = 'idle'
			})
	}
})

export const { setCurrentCategory } = dataSlice.actions;
export default dataSlice.reducer;
