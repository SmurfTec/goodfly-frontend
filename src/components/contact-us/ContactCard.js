import React from 'react';

// * ---- MUI Stuff ----- * //
import {
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Phone, WhatsApp } from '@material-ui/icons';
// * ------------------- * //

import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';

const styles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    '& .MuiCardActionArea-root': {
      cursor: 'default',
    },
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    '& .MuiCardMedia-root': {
      backgroundSize: 'contain',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  amountContent: {
    flex: 'none',
  },
}));

const ContactCard = ({ image }) => {
  const classes = styles();
  const { t } = useTranslation();

  return (
    <Card className={classes.card} component='div'>
      <CardMedia
        className={classes.cardMedia}
        image={image}
        title='Contact Us'
        sx={{ height: 300, paddingTop: 10 }}
      />
      <CardContent className={classes.cardContent} component='div'>
        <Typography
          variant='h5'
          sx={{
            position: 'absolute',
            top: '50%',
            color: '#fff',
          }}
        >
          {t('Contact Us')}
        </Typography>
        <Grid container>
          <Grid item xs={6} align='center'>
            <Typography variant='h5' gutterBottom>
              {t('Call the GoodFly Agency')}
            </Typography>
            <Button variant='contained' color='primary' startIcon={<Phone />}>
              01 34 74 19 39
            </Button>
          </Grid>
          <Grid item xs={6} align='center'>
            <Typography variant='h5' gutterBottom>
              {t('Contact the GoodFly via Whatsapp')}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<WhatsApp />}
            >
              01 34 74 19 39
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default withRouter(ContactCard);
