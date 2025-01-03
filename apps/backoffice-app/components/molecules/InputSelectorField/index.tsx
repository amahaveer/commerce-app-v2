import SearchBar from '@/components/atoms/SearchBar';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import { Box } from '@mui/material';
import { IInputSelectorFieldProps } from './type';
import { useAppContext } from 'context/application.context';
import { useLanguage } from 'context/language.context';


const InputSelectorField = (props: IInputSelectorFieldProps) => {

    const { selector, placeholder, formRegister, className, mode, wrapperClass, onClickSearch } = props;

    return (
        <Box className={`flex flex-row ${wrapperClass}`}>
            <SelectDropdown
                options={selector.options}
                placeholder={selector.placeholder}
                className={`${selector.className} rounded-r-[0px]`}
                defaultValue={selector.value}
                inputForm={selector.register}
            />
            <SearchBar
                inputClass="rounded-l-none"
                className={className}
                placeholder={placeholder}
                onClickSearch={onClickSearch}
                inputForm={formRegister}
                mode={mode}
            />
        </Box>
    )
}

InputSelectorField.Locale = (props: Omit<IInputSelectorFieldProps, 'selector.options'>) => {
    const { languageList } = useLanguage();
    return (
        <InputSelectorField {...props} selector={{ ...props.selector, options: languageList }} />
    )
}

InputSelectorField.Currency = (props: Omit<IInputSelectorFieldProps, 'selector.options'>) => {
    const { currencies } = useAppContext();
    const currenciesOption = currencies.map((item) => ({ value: item, label: item }))
    return (
        <InputSelectorField 
            {...props} 
            selector={{ ...props.selector, options: currenciesOption, value: currencies[0] }}
        />
    )
}

export default InputSelectorField;