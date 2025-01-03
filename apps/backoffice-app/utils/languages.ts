export  const languages = [
    { value: 'en-US', label: 'en-US', icon: '' },
    { value: 'de-DE', label: 'de-DE', icon: '' }
];

export const convertLocalesListToPairs = (locales: Array<string>) => (
  locales.map((locale) => ({ value: locale, label: locale }))
)

export const loadLocaleMessages = async (locale: string) => {
  try {
    const messages = await import(`../locales/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.log(`Could not load messages for locale: ${locale}`, error);
    return {};
  }
};