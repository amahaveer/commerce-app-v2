
export interface ILanguageExpose {
    locale: string, 
    languageList: Array<any>;
    messages: any;
    DEFAULT_LOCALE: string;
    switchLanguage: (value: string) => void;
}