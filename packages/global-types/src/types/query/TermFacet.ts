import { FacetTypes } from '../result';
import { Facet } from './Facet';

export interface TermFacet extends Facet {
  type: FacetTypes.TERM | FacetTypes.BOOLEAN;
  terms?: string[];
}
