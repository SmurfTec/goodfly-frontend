import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';
import { countryCodes } from 'Utils/constants';
import { useTranslation } from 'react-i18next';

export default function CountriesSelect({ onChange: ignored, control }) {
  const { t } = useTranslation();

  const getOpObj = (option) => {
    let obj;
    if (option.key) option = countryCodes.find((op) => op.label === option.key);

    obj = `${option.label}`;
    return obj;
  };

  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={countryCodes}
          multiple
          value={field.value}
          // getOptionLabel={(option) => getOpObj(option)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('Destination')}
              variant='standard'
            />
          )}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      // defaultValue={countryCodes[0]}
      name='destination'
      control={control}
    />
  );
}
