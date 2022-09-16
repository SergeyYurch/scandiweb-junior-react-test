import { client, Query, Field } from "@tilework/opus";

const END_POINT = "http://localhost:4000/graphql";

client.setEndpoint(END_POINT);

export const getCurrencies = async () => {
	const query = new Query("currencies", true)
		.addFieldList([
			"label",
			"symbol",
		])

	return await client.post(query)

}

export const getCategories = async () => {
	const query = new Query("categories", true)
		.addField(new Field("name", true))
		.addField((new Field("products", true))
			.addFieldList([
				"id",
				"name",
				"inStock",
				"gallery",
				"prices{currency{label, symbol}, amount}",
				"brand",
			]))

	return await client.post(query)

}

export const getCategory = async (category) => {
	console.log('Прилетело' + category)
	const query = new Query("category", true)
		.addArgument("input", "CategoryInput", { title: category })
		.addField(new Field("name", true))
		.addField((new Field("products", true))
			.addFieldList([
				"id",
				"name",
				"inStock",
				"gallery",
				"attributes{id, name, type, items{ displayValue, value, id }}",
				"prices{currency{label, symbol}, amount}",
				"brand",
			]))
	return await client.post(query);
}
export const getProduct = async (id) => {
	const query = new Query("product", true)
		.addArgument("id", "String!", id)
		.addFieldList([
			"id",
			"name",
			"inStock",
			"gallery",
			"description",
			"category",
			"attributes{id, name, type, items{ displayValue, value, id }}",
			"prices{ currency{ label, symbol }, amount }",
			"brand",
		])


	return await client.post(query);
}

