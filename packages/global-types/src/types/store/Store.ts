import { LocalizedString } from '../product';
import { Channel } from '../product/Channel';
import { ProductSelection } from './ProductSelection';

export interface Store {
  id?: string;
  version?: string;
  key?: string;
  name?: string | LocalizedString;
  languages?: string[];
  distributionChannels?: Channel[];
  countries?: string[];
  supplyChannels?: Channel[];
  productSelections?: ProductSelection;
  custom?: any;
  createdAt?: string;
  lastModifiedAt?: string;
}
