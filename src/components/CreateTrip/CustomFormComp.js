import React from 'react';
import {
   FormControl,
   FormHelperText,
   RadioGroup,
   FormControlLabel,
   Radio,
} from '@material-ui/core';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

export const CustomSelect = ({
   name,
   control,
   message,
   placeholder,
   options,
   errors,
}) => {
   return (
      <>
         <FormControl
            size={'small'}
            error={Boolean(errors[name])}
            fullWidth
         >
            <Controller
               rules={{
                  required: `${message}`,
               }}
               render={({ field }) => (
                  <Select
                     {...field}
                     isSearchable={false}
                     placeholder={placeholder}
                     options={options}
                  />
               )}
               control={control}
               name={name}
            />

            {errors?.[name]?.type === 'required' && (
               <FormHelperText>{errors[name].message}</FormHelperText>
            )}
         </FormControl>
      </>
   );
};

export const CustomRadioGroup = ({
   name,
   control,
   options,
   defaultValue,
}) => {
   <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
         <RadioGroup {...field} aria-label={name} row>
            {options.map((option) => (
               <FormControlLabel
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
               />
            ))}
         </RadioGroup>
      )}
   />;
};
