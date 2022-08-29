import { client, Query, Field } from "@tilework/opus";

const END_POINT = "http://localhost:4000/graphql";

class QueryServices {
	constructor() {
		client.setEndpoint(END_POINT);
	}

	getCategories = async () => {
		const query = new Query("categories", true)
			.addField(new Field("name", true))
			.addField((new Field("products", true))
				.addFieldList([
					"id",
					"name",
					"inStock",
					"gallery",
					"description",
					"category",
					"attributes{id, items{value, id}}",
					"prices{currency{label, symbol}, amount}",
					"brand",
				]))
		return await client.post(query);
	}


	getCategory = async (category) => {
		const query = new Query("category", true)
			.addArgument("input", "CategoryInput", { title: category })
			.addField(new Field("name", true))
			.addField((new Field("products", true))
				.addFieldList([
					"id",
					"name",
					"inStock",
					"gallery",
					"description",
					"category",
					"attributes{id, items{value, id}}",
					"prices{currency{label, symbol}, amount}",
					"brand",
				]))
		return await client.post(query);
	}
	getProduct = async (id) => {
		const query = new Query("product", true)
			.addArgument("id", "String!", id)
			.addFieldList([
				"id",
				"name",
				"inStock",
				"gallery",
				"description",
				"category",
				"attributes{id, items{value, id}}",
				"prices{currency{label, symbol}, amount}",
				"brand",
			])
		// .addField(new Field("name", false))
		// .addField(new Field("id", false))

		return await client.post(query);
	}


}



export default QueryServices