
const localeMap: Record<string, string> = {
    en: 'en-US',
    de: 'de-DE',
    // Add more mappings as needed
};

export function getLocale(locale: string): string {
    return localeMap[locale] || locale; 
}
