export interface IDatePickerProps {
    value?: string;
    formRegister?: any;
    control?: any;
    fieldName: string;
    disabled?: boolean;
    disablePastDates?: boolean;
    onSelectDate?: (value: string) => void;    
}