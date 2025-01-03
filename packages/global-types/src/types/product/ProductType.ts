import { AttributeDefinition } from './AttributeDefinition';

export interface ProductType {
  id: string;
  version?: string;
  key?: string;
  name?: string;
  description?: string;
  attributes?: AttributeDefinition[];
  createdAt?: string;
  lastModifiedAt?: string;
}
