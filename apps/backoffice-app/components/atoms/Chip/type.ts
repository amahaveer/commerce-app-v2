
export interface IChipProps {
    label: string;
    color?: string;
    bgColor?: string;
    className?: string;
    iconClass?: string;
    showDeleteIcon?: boolean;
    onDelete?: () => void;
    type?: 'success' | 'secondary' | 'error' | 'none'
}