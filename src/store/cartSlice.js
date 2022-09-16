import { createSlice, current } from '@reduxjs/toolkit'


let initialState = {
	products: [],
	quantity: 0,
}
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
if (cartFromLocalStorage) initialState = cartFromLocalStorage

const calculateQuantity = (state) => {
	let quantity = 0;
	state.products.forEach(prod => quantity += prod.count)
	return quantity
}



const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: (state) => {
			state.products = []
			state.quantity = 0
			localStorage.setItem('cart', JSON.stringify(state))

		},
		addProductToCart: (state, action) => {
			state.products.push(action.payload)
			state.quantity = calculateQuantity(state)
			localStorage.setItem('cart', JSON.stringify(state))

		},
		deleteProductFromCart: (state, action) => {
			console.log('product delete' + action.payload)
			state.products = state.products.filter((prod) => !(prod.id === action.payload))
			state.quantity = calculateQuantity(state)
			localStorage.setItem('cart', JSON.stringify(state))


		},
		updateProductInCart: (state, action) => {
			state.products = state.products.map((prod) => {
				if (prod.id === action.payload.id) {
					prod.count += action.payload.value
					return (prod)
				}
				return prod
			})
			state.quantity = calculateQuantity(state)
			localStorage.setItem('cart', JSON.stringify(state))

		},
	},

	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

const { actions, reducer } = cartSlice
export default reducer;
export const {
	addProductToCart,
	deleteProductFromCart,
	updateProductInCart,
	clearCart,
} = actions;