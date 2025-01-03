import React from "react";

export interface ICardProps {
    children: React.ReactElement;
    shadow?: number;
}

export interface ICardTitleProps {
    text?: string; 
    children?: React.ReactNode;
    className?: string;
}