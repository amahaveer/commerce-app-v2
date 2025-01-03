import { SelectProps } from '@mui/material'; // Import the SelectProps from MUI

export interface ISelectDropdownProps {
    options: Array<any>;
    placeholder?: string;
    fullWidth?: boolean;
    labelAlias?: string;
    valueAlias?: string;
    defaultValue?: string;
    className?: string;
    width?: string;
    multiple?: boolean;
    onSelect?: (item: any) => void;
    sx?: any;
    prefixIcon?: React.ReactElement;
    placeholderStyle?: string;
    chipMode?: boolean;
    disabled?: boolean;
    inputForm?: any
} 