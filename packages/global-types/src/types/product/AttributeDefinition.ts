import { LocalizedString } from '../LocalizedString';

export interface AttributeDefinition {
  type?: any;
  name?: string;
  label?: LocalizedString;
  isRequired?: boolean;
  attributeConstraint?: string;
  inputTip?: LocalizedString;
  inputHint?: string;
  isSearchable?: boolean;
}
