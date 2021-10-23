import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';

const Formalities = [
  {
    id: 1,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
  {
    id: 2,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
  {
    id: 3,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
  {
    id: 4,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
  {
    id: 5,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
  {
    id: 6,
    title: 'Formalities administratives',
    subtitle: 'Prise en charge du dossier et de enregistment',
    description: 'Notre dsadas occupe de tout bla bla bla bla',
  },
];

const FormalitiesTab = () => {
  return (
    <div>
      <Grid container>
        {Formalities &&
          Formalities.map((formality) => (
            <Grid item xs={12} sm={6} key={formality.id}>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'self-end',
                  justifyContent: 'left',
                }}
              >
                <Typography variant='h1' style={{ fontSize: '3rem' }}>
                  {' '}
                  .{' '}
                </Typography>
                <Typography variant='h4'>{formality.title}</Typography>
              </Box>
              <Box style={{ paddingLeft: '1.5rem' }}>
                <Typography variant='h5'>{formality.subtitle}</Typography>
                <Typography variant='text' style={{ fontSize: '0.8rem' }}>
                  {formality.description}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default FormalitiesTab;
