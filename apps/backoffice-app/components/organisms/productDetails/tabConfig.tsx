import ProductGeneralInfo from '@/components/organisms/addProduct/general';
import AddVariantInfo from '@/components/organisms/addProduct/variantInfo';
import IntExtSearch from '@/components/organisms/addProduct/intExtSearch';
import ProductSelection from '@/components/organisms/addProduct/productSelections';
import { eProductPermissions } from "@royalcyber/global-types/src/backoffice-types/permissions/productPermissions.type";
import { TranslationKeys } from 'types/global';
import ProductAnalystics from './analytics';

interface ITabConfig {
    label: TranslationKeys;
    path: string;
    component: any;
    permission: string;
}

export const tabConfigurations: Array<ITabConfig> = [
    { 
        label: 'common.general', 
        path: "/general", 
        component: ProductGeneralInfo,
        permission: eProductPermissions.VIEW_GENERAL_TAB,
    },
    { 
        label: 'common.variants', 
        path: "/variants", 
        component: AddVariantInfo,
        permission: eProductPermissions.VIEW_VARIANTS_TAB,
    },
    { 
        label: 'common.intExtSearch', 
        path: "/search", 
        component: IntExtSearch,
        permission: eProductPermissions.VIEW_INTERNAL_EXTERNAL_TAB,
    },
    { 
        label: 'product.productSelections', 
        path: "/product-selections", 
        component: ProductSelection,
        permission: eProductPermissions.VIEW_PRODUCT_SELECTIONS_TAB,
    },
    {
        label: "common.analytics",
        path: '/analytics',
        component: ProductAnalystics,
        permission: eProductPermissions.VIEW_GENERAL_TAB,
    }
  ];