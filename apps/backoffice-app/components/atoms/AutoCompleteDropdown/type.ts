
export interface IMultiSelectProps {
    fullWidth?: boolean; 
    labelAlias?: string;
    valueAlias?: string; 
    options: Array<any>;
    multiple?: boolean;
    limitTags?: number;
    className?: string;
    height?: string;
    placeholder?: string;
    padding?: string;
    disabled?: boolean;
    inputValue?: string;
    inputForm?: any;
    asyncSearch?: boolean;
    renderOption?: (props: any, option: any) => React.ReactNode;
    onSelect: (value: any) => void;
    fetchData?: (value: string) => Promise<any>;
}