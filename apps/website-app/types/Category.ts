
export interface User {
    typeId: string;
    id: string;
}

export interface LastModifiedBy {
    isPlatformClient: boolean;
    user: User;
}

export interface CreatedBy {
    isPlatformClient: boolean;
    user: User;
}

export interface Name {
    'en-US': string;
    'de-DE': string;
    // Add other locales as necessary
}

export interface Slug {
    'en-US': string;
    'de-DE': string;
    // Add other locales as necessary
}

export interface CategoryResult {
    id: string;
    version: number;
    versionModifiedAt: string; // ISO string
    lastMessageSequenceNumber: number;
    createdAt: string; // ISO string
    lastModifiedAt: string; // ISO string
    lastModifiedBy: LastModifiedBy;
    createdBy: CreatedBy;
    name: Name;
    slug: Slug;
    ancestors: any[]; // Adjust type if you have a specific structure for ancestors
    orderHint: string;
    assets: any[]; // Adjust type if you have a specific structure for assets
}

export interface Category {
    limit?: number;
    offset?: number;
    count?: number;
    total?: number;
    results?: CategoryResult[];
}


export interface CategoryItem {
    categoryId?: string;
    name?: string;
    slug?: string;
    depth?: number;
    _url?: string;
    parentId?: string;
  }
  
  export interface CategoryResponse {
    total: number;
    items: CategoryItem[];
    count: number;
    query: any;
  }
  
  export interface CategoryData {
    data: CategoryResponse;
  }
  