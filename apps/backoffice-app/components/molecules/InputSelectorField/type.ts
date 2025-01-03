export interface IInputSelectorFieldProps {
    placeholder?: string;
    formRegister?: any;
    className?: string;
    wrapperClass?: string;
    mode?: 'search' | 'number' | 'text'
    value?: string;
    selector: {
        placeholder?: string;
        value?: string;
        className?: string;
        register?: any;
        options: Array<any>;
    }
    onClickSearch: (value: string) => void;
}