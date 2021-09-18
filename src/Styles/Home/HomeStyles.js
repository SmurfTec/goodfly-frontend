import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {},

  MainGrid: {},
  LeftGridItem: {
    border: '1px solid #ccc',
    paddingInline: 20,
  },
  RightGridItem: {
    paddingInline: 20,
    border: '1px solid #ccc',
  },
}));

export default useStyles;
