export interface IconTextLinkProps {
    icon?: React.ReactNode;
    text: string;
    textClass?: string;
    wrapperClass?: string;
    linkStyle?: boolean;
    onClick?: () => void;
}