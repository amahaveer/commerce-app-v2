import { eProductSearchFields } from "constants/product.constant";
import { ITranslateFunc } from "types/global";

export const getProductSearchOptions = () => {
	return Object.entries(eProductSearchFields).map(([key, value]) => ({
		label: key.replace(/_/g, ' '),
		value: value
	}));
};

export const getProductVariantSelectionOptions  = (translate: ITranslateFunc) => [
	{ value: "all", label: translate("product.allVariants") },
	{ value: "includeOnly", label: translate("product.onlyTheFollowingVariants") },
	{ value: "includeAllExcept", label: translate("product.allVariantsWithSkuValuesExcept") },
]

export const getProductPriceModeOptions  = (translate: ITranslateFunc) => [
	{ value: "standalonePrices", label: translate("product.standalonePrices") },
	{ value: "embededPrices", label: translate("product.embededPrices") },
]

export const getProductTaxCateogoryOptions  = () => [
	{ label: "Default", value: "default" },
	{ label: "Low Category", value: "low_category" },
	{ label: "No Tax Category", value: "no_tax_category" },
	{ label: "Standard", value: "standard" },
]

export const createSlug = (inputString: string) => {
	return inputString
	  .toLowerCase() // Convert to lowercase
	  .trim() // Remove whitespace from both ends
	  .replace(/[^a-z0-9\s-]/g, '') // Remove any non-alphanumeric characters
	  .replace(/\s+/g, '-') // Replace spaces with hyphens
	  .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
}