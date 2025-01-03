
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface IAppDrawerProps {
    position?: Anchor;
    children: React.ReactElement;
    open: boolean;
    drawerWidth?: string;
    breadcrumb?: Array<string>
    onClose: () => void;
}