import { Box, InputBase, Typography } from '@mui/material';
import { IPrefixInputProps } from './type';

const PrefixInputBase = (props: IPrefixInputProps) => {
  const {
    placeholder,
    value,
    disabled,
    prefix,
    wrapperClass,
    error = false,
    errorMessage,
    type,
    onChange,
    inputProps
  } = props;

  const onChangeValue = (e: any) => {
    onChange && onChange(e.target.value);
  };

  return (
    <Box className={`relative ${wrapperClass} `}>
      {/* Static Prefix Text */}
      {prefix && (
        <Typography
          component="span"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          style={{
            color: '#878CAB',
            borderRight: '1px solid #D1D5DB',
            paddingRight: '8px'
          }}
        >
          {prefix}
        </Typography>
      )}

      {/* MUI Input with Padding for Static Text */}
      <InputBase
        type={type}
        // value={value}
        disabled={disabled}
        // onChange={onChangeValue}
        size="medium"
        placeholder={placeholder}
        className={`${prefix && 'pl-16'} ${disabled && 'bg-customGray-grayishBlue'} 
					py-2 rounded-md w-full border ${error ? 'border-red-500' : 'border-gray-300'}`}
        sx={{
          '& .MuiInputBase-input': {
            paddingLeft: '1.2rem',
            paddingY: '10px'
          },
          border: '1px solid #D1D5DB',
          borderRadius: '0.375rem',
          width: '100%',
          '&:focus-within': {
            borderColor: '#dddbff'
          },
          height: '40px'
        }}
        {...(!inputProps && {
          onChange: onChangeValue
        })}
        {...inputProps}
      />

      {error && errorMessage && (
        <Typography variant="body2" color="error" className="mt-1">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default PrefixInputBase;
