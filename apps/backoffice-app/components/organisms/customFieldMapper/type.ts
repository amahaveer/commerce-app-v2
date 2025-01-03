import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

export interface IFormFieldMapperProps {
    formFields: Array<any>; 
    formData: any;
    register?: UseFormRegister<any>; 
    errors?: FieldErrors;
    control?: Control;
    emptyMessage?: string;
}