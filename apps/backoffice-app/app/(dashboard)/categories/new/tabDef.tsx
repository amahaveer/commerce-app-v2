import BasicCategoryInformation from '@/components/organisms/categories/addCategory/categoryInformation/categoryInformation';
import CategoryLocation from '@/components/organisms/categories/addCategory/categoryLocation/categoryLocation';
import ExternalInformation from '@/components/organisms/categories/addCategory/externalInformation/externalInformation';

export const getStepList = () => [
  {
    path: '',
    label: 'Add basic category information',
    component: BasicCategoryInformation
  },
  {
    path: '',
    label: 'Configure category location',
    component: CategoryLocation
  },
  {
    path: '',
    label: 'Add external search information',
    component: ExternalInformation
  }
];
