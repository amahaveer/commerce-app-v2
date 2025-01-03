import React from "react";
import { FunctionComponent } from 'react';

export interface IButtonProps {
    title: string;
    variant?: 'contained' | 'outlined' | 'text';
    className?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void;
}

export interface ICustomButtonType extends FunctionComponent<IButtonProps> {
    Add: (_props: Omit<IButtonProps, 'icon'>) => JSX.Element;
    Save: (_props: Omit<IButtonProps, 'icon'>) => JSX.Element;
    Filter: (_props: Omit<IButtonProps, 'icon'>) => JSX.Element;
    Height: (_props: Omit<IButtonProps, 'icon'>) => JSX.Element;
    InsertLink: (_props: Omit<IButtonProps, 'icon'>) => JSX.Element;
    LocalShipping: (_props: Omit<IButtonProps, 'icon'>) => JSX.Element;
    ReceiptLong: (_props: Omit<IButtonProps, 'icon'>) => JSX.Element;
}