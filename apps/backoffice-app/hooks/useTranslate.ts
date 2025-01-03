import { useIntl } from 'react-intl';
import { TranslationKeys } from 'types/global';

const useTranslate = () => {
    
    const intl = useIntl();

    const translate = (id: TranslationKeys) => {
        const message = intl.formatMessage({ id });
        return message
    }

    return { translate };
}

export default useTranslate;