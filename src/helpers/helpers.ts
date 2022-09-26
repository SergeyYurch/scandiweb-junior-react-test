import dompurify from 'dompurify';
import { CleanHtml, Currency, Price, Product } from '../types/data.types';

export const generateId = (): string => Math.random().toString(16).substring(2, 9);

export const getPrice = (product: Product, currency: Currency): Price => {
	const priceCurr: Price | undefined = product.prices.find((p) => p.currency.label === currency.label);

	if (priceCurr) {
		return priceCurr;
	} else {
		return { currency: currency, amount: 0 };
	}
};

export const createPriceRecord = (prices: Price[], currency: Currency): string => {
	let price = 'No price';
	const priceCurr: Price | undefined = prices.find((p) => p.currency.label === currency.label);
	if (priceCurr) price = priceCurr.currency.symbol + priceCurr.amount;
	return price;
};


export const toCleanDescription = (description: string): CleanHtml => {
	const cleanDescriprion = dompurify.sanitize(description, { FORCE_BODY: true });
	return ({ __html: cleanDescriprion });
};
