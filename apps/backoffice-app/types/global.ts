import { Dispatch, SetStateAction } from "react";
import enMessages from '../locales/en-US.json';
import { IProjectData } from "./project.type";

export interface IAppContextExpose {
	openFilterDrawer: boolean;
	editFilter: boolean;
	countries: Array<string>;
	currencies: Array<string>;
	projectList: Array<IProjectData>;
	selectedProject: string;
	userData: IUserData | null;
	setOpenFilterDrawer: Dispatch<SetStateAction<boolean>>;
	setEditFilter: Dispatch<SetStateAction<boolean>>;
	setSelectedProject: Dispatch<SetStateAction<string>>;
}

export interface IUserData {
	email: string;
	firstName: string;
	lastName: string;
}

export enum eFieldType {
	DROPDOWN = "dropdown",
	RADIO = "radio",
	CHECKBOX = "checkbox",
	DATE = "date",
}

export interface IOptionPair {
	label: string;
	value: string;
}

export interface IFilterComponents {
	type: eFieldType;
	options: Array<any>;
	placeholder?: string;
	field?: string;
}

export interface IFilterSchema {
	label: string;
	field: string;
	components: Array<IFilterComponents>;
}


type NestedKeys<T> = T extends Record<string, any> 
    ? { [K in keyof T]: K extends string ? `${K}` | `${K}.${NestedKeys<T[K]>}` : never }[keyof T] 
    : never;

export type TranslationKeys = NestedKeys<typeof enMessages>;

export type ITranslateFunc = (key: TranslationKeys) => string;

export interface IFormFieldMapper {
  title: string;
  field: string;
  description?: { text: string; icon?: string };
  info?: string;
  multiLocale?: boolean;
  options?: Array<any>;
  prefix?: string | null;
  required?: boolean;
  placeholder?: { text: string; className?: string };
  type:
    | 'select'
    | 'text'
    | 'auto_complete'
    | 'date_range'
    | 'number'
    | 'currency_selector'
    | 'date_picker'
    | 'radio'
    | 'password';
  wrapperClass?: string;
  disabled?: boolean;
  className?: string;
  /* this field is for currency_selector dropdown */
  selector?: { className?: string; mode?: 'text' | 'search' | 'number' };
  onChange?: (value: any, field: string) => void;
}

export interface IFormatCurrency {
	currencyCode?: string; 
	centAmount?: number;
	fractionDigits?: number;
}

export interface IRequestPayload<T = any> {
	body?: T;
	query?: string;
	params?: string
}

export interface IFormSchemaParams {
	onChange: (value: any, field?: any) => any;
	hasPermission: (key: string) => boolean;
}

