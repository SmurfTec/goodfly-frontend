import React from 'react';
import {
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Checkbox,
  Rating,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useStyles } from 'Styles/Form/FormStyles';

const colourStyles = {
  option: (styles) => {
    return {
      ...styles,
      color: '#000',
    };
  },
};

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
              styles={colourStyles}
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
export const CustomTextField = (props) => {
  const { name, label, type, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      rules={{ required: `${label} required` }}
      render={({ field: { onChange, value } }) => (
        <TextField
          onChange={onChange}
          value={value}
          variant='standard'
          label={label}
          name={name}
          type={type}
          fullWidth
          required
        />
      )}
    />
  );
};

export const CustomDatePicker = (props) => {
  const { errors, label, name, errorMessage, register, type } = props;
  const classes = useStyles();

  return (
    <FormControl fullWidth error={Boolean(errors?.[name])}>
      <Typography variant='body2' sx={{ mb: 1 }}>
        {label}
      </Typography>
      <input
        type={type}
        className={classes.textInput}
        {...register(name, {
          required: true,
        })}
      />

      {errors?.[name] && (
        <FormHelperText>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export const CustomInputField = ({
  errors,
  label,
  name,
  errorMessage,
  register,
  placeholder,
  type,
}) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth error={Boolean(errors?.[name])}>
      <Typography variant='body2' sx={{ mb: 1 }}>
        {label}
      </Typography>
      <input
        className={classes.textInput}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: true,
        })}
      />
      {errors?.[name]?.type === 'required' && (
        <FormHelperText>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export const CustomRadioGroup = ({ name, control, options }) => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        key={singleOption.key}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options[0].value}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          defaultChecked={options[0].value}
          value={value}
          onChange={onChange}
        >
          {generateRadioOptions()}
        </RadioGroup>
      )}
    />
  );
};

export const CustomRating = (props) => {
  const { control, name, options } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options[0]}
      render={({ field: { onChange, value } }) => (
        <Rating value={value} onChange={onChange} size='large' />
      )}
    />
  );
};
