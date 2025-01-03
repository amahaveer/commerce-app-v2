export enum FacetTypes {
  BOOLEAN = 'boolean',
  TERM = 'term',
  RANGE = 'range',
  ENUM = 'enum'
}

export interface Facet {
  type: FacetTypes.BOOLEAN | FacetTypes.TERM | FacetTypes.RANGE | FacetTypes.ENUM;
  identifier: string;
  label: string;
  key: string; // 'key' is used to identify the facet in the frontend regardless the language.
  count?: number;
  selected?: boolean;
}
