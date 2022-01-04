import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  carouselCard: {
    display: 'block',
    padding: 10,
    height: '100%',
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },
  title: {
    paddingLeft: 40,
    paddingTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    position: 'absolute',
    top: '65%',
    left: '10%',
    transform: 'translate(-10%, -50% )',
  },
  PriceSlider: {
    '&.MuiSlider-root': {
      color: `#ccc !important`,
    },
  },
  Input: {
    color: theme.palette.text.secondary,
    borderColor: theme.palette.text.secondary,
    '& .MuiRadio-root': {
      color: theme.palette.text.secondary,
      borderColor: theme.palette.text.secondary,
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.text.secondary,
      borderColor: theme.palette.text.secondary,
    },
  },
}));

export default useStyles;
