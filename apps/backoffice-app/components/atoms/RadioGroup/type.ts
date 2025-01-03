export interface IRadioGroupProps {
    options: Array<any>;
    title?: string;
    row?: boolean;
    labelClass?: string;
    wrapperClass?: string;
    value?: string;
    onSelect?: (_value: string) => void;
}