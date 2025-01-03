import { eCartDiscountSearchFields } from "constants/common";
import { ITranslateFunc } from "types/global";

export const getCartDiscountSearchOptions = () => {
    return Object.entries(eCartDiscountSearchFields).map(([key, value]) => ({
        label: key.replace(/_/g, ' '),
        value: value
    }));
};

export const getEligibilityCriteriaOptions = (translate: ITranslateFunc) => [
    { value: "option1", label: translate("common.areTrue") },
    { value: "option2", label: translate("common.areNotTrue") },
    { value: "option3", label: translate("common.oneOfTrue") },
    { value: "option4", label: translate("common.oneOfNotTrue") },
]

export const getEligibilityConditionOptions = (translate: ITranslateFunc) => [
    { value: "option1", label: translate("common.is") },
    { value: "option2", label: translate("common.isNot") },
    { value: "option3", label: translate("common.isOne") },
    { value: "option4", label: translate("common.isNotOne") },
]