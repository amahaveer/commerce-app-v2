import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { useState } from 'react';
import { IPrefixInputProps } from './type';

const PasswordInput = (props: IPrefixInputProps) => {
  const {
    placeholder,
    value,
    disabled,
    prefix,
    wrapperClass,
    error = false,
    errorMessage,
    onChange,
    inputProps
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onChangeValue = (e: any) => {
    onChange && onChange(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? 'hide the password' : 'display the password'
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        placeholder={placeholder}
        value={value}
        onChange={onChangeValue}
        disabled={disabled}
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

export default PasswordInput;
