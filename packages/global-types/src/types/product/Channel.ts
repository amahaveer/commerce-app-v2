import { Address } from '../account';
import { LocalizedString } from '../LocalizedString';
import { ReviewRatingStatistics } from './ReviewRatingStatistics';

export interface Channel {
  id?: string;
  version?: string;
  key?: string;
  roles?: string[];
  name?: string | LocalizedString;
  description?: string | LocalizedString;
  address?: Address;
  reviewRatingStatistics?: ReviewRatingStatistics | undefined;
  geoLocation?: any;
  custom?: any;
  createdAt?: string;
  lastModifiedAt?: string;
}
