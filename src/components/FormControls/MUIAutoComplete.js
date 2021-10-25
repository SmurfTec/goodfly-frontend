import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';
import { countryCodes } from 'Utils/constants';

export default function CountrySelect({
  onChange: ignored,
  control,
}) {
  const getOpObj = (option) => {
    let obj;
    if (option.key)
      option = countryCodes.find((op) => op.label === option.key);

    obj = `+${option.phone}  (${option.label})`;
    return obj;
  };

  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={countryCodes}
          getOptionLabel={(option) => getOpObj(option)}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Country Code'
              variant='standard'
            />
          )}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      defaultValue={countryCodes[0]}
      name='countryCode'
      control={control}
    />
  );
}
