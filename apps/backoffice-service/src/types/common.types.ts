export enum eCollectionNames {
    USER = 'users',
    ORGANIZATIONS = 'organizations',
    TEAMS = 'teams',
    PERMISSIONS = 'permissions',
    PROJECTS = 'projects',
    MEMBER = 'member',
    EXTENSION_APP = 'extension_apps'
}


export enum eModulesName {
    PRODUCTS = "products",
    ORDERS = "orders",
    CUSTOMERS = "customers",
}

export enum eRoles {
    SUPER_ADMIN = "Super Admin",
    ADMINISTRATORS = 'Administrators',
    CUSTOM = "custom"
}

export interface JwtPayload {
    userId: string;
    email: string;
  }