import { eCategoryPermission } from '@/shared-types/permissions/categoryPermissions.type';
import CategoryGeneralComponent from './general';
import CategoryProductsComponent from './products';
import CategoryExtSearchComponent from './extSearch';

export const tabConfigurations: Array<any> = [
  {
    label: 'General',
    path: '/general',
    component: CategoryGeneralComponent
    // permission: eCategoryPermission.VIEW_GENERAL_TAB
  },
  {
    label: 'Products',
    path: '/products',
    component: CategoryProductsComponent
    // permission: eCategoryPermission.VIEW_GENERAL_TAB
  },
  {
    label: 'Ext.Search',
    path: '/extSearch',
    component: CategoryExtSearchComponent
    // permission: eCategoryPermission.VIEW_GENERAL_TAB
  }
];
