import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { IDatePickerProps } from './type';
import { Controller } from "react-hook-form";
import { FormControl } from "@mui/material";

const DatePickerField = (props: IDatePickerProps) => {
  
  const { onSelectDate, value, control, fieldName, disabled, disablePastDates } = props;
  
  return (
    <Controller
      name={fieldName}
      control={control}
      disabled={disabled}
      defaultValue={value || null}
      render={({ field, fieldState }) => {
        const { value, onChange, ...restFields } = field;
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth>
              <DatePicker
                // label={label}
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                  if (date) {
                    const formattedDate = dayjs(date).format('MM/DD/YYYY hh:mm A');
                    onChange(formattedDate); // Pass formatted date to react-hook-form
                  } else {
                    onChange(null); // Handle clearing of date
                  }
                }}
                {...restFields}
                disablePast={disablePastDates}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    width: '100%',
                    height: "40px",
                  },
                  '& .MuiDialog-root .MuiPickersPopper-root': {
                    width: '100%', 
                  }
                }}
              />
            </FormControl>
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default DatePickerField;


{/* <LocalizationProvider  dateAdapter={AdapterDayjs}>
<DatePicker
  defaultValue={dayjs('2022-04-17')}
  {...formRegister}
  sx={{
    width: '100%',
    '& .MuiOutlinedInput-root': {
      width: '100%',
      height: "40px",
    },
    '& .MuiDialog-root .MuiPickersPopper-root': {
      width: '100%', 
    }
  }}
/>
</LocalizationProvider> */}





// const DatePickerComponent = () => {
//   const { name, defaultValue, label, disabled, disablePast } = item;
//   return (
//     <Controller
//       name={name}
//       control={control}
//       disabled={disabled}
//       defaultValue={defaultValue || null}
//       render={({ field, fieldState }) => {
//         const { value, ...restFields } = field;
//         return (
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <FormControl fullWidth>
//               <DatePicker
//                 label={label}
//                 value={value ?? null}
//                 slotProps={{
//                   textField: {
//                     error: !!fieldState.error,
//                     helperText: fieldState.error?.message,
//                   },
//                 }}
//                 {...restFields}
//                 disablePast={disablePast}
//               />
//             </FormControl>
//           </LocalizationProvider>
//         );
//       }}
//     />
//   );
// };

