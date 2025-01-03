export interface IPermissionsContextProps { 
    children: React.ReactNode; 
    moduleName: 'all' | 'orders' | 'products' | 'customers' | 'discounts'
}

export interface IExposePermissions {
    permissions: Array<string>;
    hasPermission: (key: string) => boolean;
}