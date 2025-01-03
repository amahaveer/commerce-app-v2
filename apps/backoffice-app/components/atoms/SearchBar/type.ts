export interface ISearchBarProps {
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    inputClass?: string;
    fullWidth?: boolean;
    searchValue?: string;
    inputForm?: any;
    mode?: 'number' | 'text' | 'search'
    onClickSearch: (text: string) => void; 
}