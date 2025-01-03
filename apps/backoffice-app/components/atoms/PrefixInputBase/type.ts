
export interface IPrefixInputProps {
    prefix: React.ReactNode | string;
    placeholder?: string;
    value?: string;
    wrapperClass?: string;
    inputClassName?: string;
    type?: "number" | "text"
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    inputProps?: any; 
    onChange?: (value: string) => void;
}