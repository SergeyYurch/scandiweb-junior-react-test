
export interface Attribute {
	displayValue: string,
	value: string,
	id: string
}

export interface AttributeSet {
	id: string,
	name: string,
	type: string,
	items: Attribute[]
}

export interface Product {
	id: string,
	name: string,
	inStock: boolean,
	gallery: string[],
	description: string,
	category: string,
	attributes: AttributeSet[],
	prices: Price[],
	brand: string
}

export interface Category {
	name: string,
	products: Product[]
}

export interface Currency {
	label: string,
	symbol: string
}

export interface Price {
	currency: Currency,
	amount: number
}
export interface Cart {

}


	// product: {
	// 	id: '',
	// 	inCart: false,
	// 	name: '',
	// 	inStock: true,
	// 	gallery: [],
	// 	description: '',
	// 	category: '',
	// 	attributes: [{
	// 		id: '',
	// 		name: '',
	// 		type: '',
	// 		items: [{
	// 			displayValue: '',
	// 			value: '',
	// 			id: ''
	// 		}]
	// 	}],
	// 	prices: [{
	// 		currency: {
	// 			label: '',
	// 			symbol: ''
	// 		},
	// 		amount: 0
	// 	}],
	// 	brand: ''
	// },