import { FacetTypes } from '../result';
import { Facet } from './Facet';

export interface RangeFacet extends Facet {
  type: FacetTypes.RANGE;
  min?: number;
  max?: number;
  // count?: number;
  minSelected?: number;
  maxSelected?: number;
}
