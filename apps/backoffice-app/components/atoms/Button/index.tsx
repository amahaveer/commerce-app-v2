import React from 'react';
import Button from '@mui/material/Button';
import {
  Add,
  FilterAlt,
  Save,
  Height,
  InsertLink,
  LocalShippingOutlined,
  ReceiptLongOutlined
} from '@mui/icons-material'; 
import { IButtonProps, ICustomButtonType } from './type';


const BaseButton = (props: IButtonProps) => {
    const { title, variant, icon, className, disabled, type, onClick } = props;

    const defaultClass = `font-inter normal-case ${disabled && 'bg-customGray-grayishBlue text-customGray'}`;
    return (
        <Button 
            className={`${defaultClass} ${className}`} 
            variant={variant || 'outlined'} 
            startIcon={icon} 
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {title}
        </Button>
    );
};


const CustomButton: ICustomButtonType = (props: IButtonProps) => {
    return <BaseButton {...props} />; 
};

CustomButton.Add = (props: Omit<IButtonProps, 'icon'>) => (
    <BaseButton {...props} icon={<Add />} />
);

CustomButton.Save = (props: Omit<IButtonProps, 'icon'>) => (
    <BaseButton {...props} icon={<Save />} />
);

CustomButton.Filter = (props: Omit<IButtonProps, 'icon'>) => (
    <BaseButton {...props} icon={<FilterAlt />} />
);

CustomButton.Height = (props: Omit<IButtonProps, 'icon'>) => (
    <BaseButton {...props} icon={<Height />} />
);

CustomButton.InsertLink = (props: Omit<IButtonProps, 'icon'>) => (
    <BaseButton {...props} icon={<InsertLink />} />
);
CustomButton.LocalShipping = (props: Omit<IButtonProps, 'icon'>) => (
  <BaseButton {...props} icon={<LocalShippingOutlined />} />
);  
CustomButton.ReceiptLong = (props: Omit<IButtonProps, 'icon'>) => (
  <BaseButton {...props} icon={<ReceiptLongOutlined />} />
);


export default CustomButton;
