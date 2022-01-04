import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { Box } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
// import { useThemeContext } from 'Components/theme';

const useStyles = makeStyles((theme) => ({
  container: {
    cursor: 'text',
    display: 'flex',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
    border: '1px solid rgb(229, 232, 235)',
    marginRight: '11%',
    width: '100%',
    padding: 12,
    height: 45,
    maxWidth: 700,
    '& input': {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      width: '100%',
    },
    '& svg': {
      color: '#707a83',
    },
  },
  searchIcon: {
    display: 'flex',
    marginRight: 8,
  },
}));

export default function SearchBar({ search, handleSearchChange }) {
  const classes = useStyles();

  return (
    <Box display='flex' flexBasis='35%' style={{ marginRight: '7%' }}>
      <Box height='45px' width='100%'>
        <div className={classes.container}>
          <div className={classes.searchIcon}>
            <Search fontSize='small' />
          </div>
          <input
            aria-invalid='false'
            aria-autocomplete='list'
            aria-controls='NavSearch--results'
            placeholder='Search on GOODFLYSTORE'
            type='search'
            value={search}
            onChange={handleSearchChange}
            style={{ cursor: 'text' }}
          />
        </div>
      </Box>
    </Box>
  );
}
