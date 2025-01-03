import ProductGeneralInfo from "@/components/organisms/addProduct/general";
import IntExtSearch from "@/components/organisms/addProduct/intExtSearch";
import AddProductType from "@/components/organisms/addProduct/productType";
import AddVariantInfo from "@/components/organisms/addProduct/variantInfo";


export const getStepList = () => [
  {
    path: '',
    label: 'Select a product type',
    component: AddProductType
  },
  {
    path: '',
    label: 'Add general information',
    component: ProductGeneralInfo
  },
  {
    path: '/variant',
    label: 'Add Variants information',
    component: AddVariantInfo
  },
  {
    path: '',
    label: 'Add internal and external search information',
    component: IntExtSearch
  }
];