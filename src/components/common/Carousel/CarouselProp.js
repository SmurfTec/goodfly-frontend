import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
   root: {
      margin: 'auto',
      '& .react-multiple-carousel__arrow::before': {
         color: 'white',
         marginLeft: '0',
      },

      '& .react-multiple-carousel__arrow': {
         backgroundColor: theme.palette.grey[900],
         borderRadius: 0,
         opacity: 0.6,

         '&:hover': {
            opacity: 1,
         },
      },
      '& .react-multiple-carousel__arrow--right ': {
         height: 80,
         right: 0,
         borderBottomLeftRadius: 25,
         borderTopLeftRadius: 25,
      },
      '& .react-multiple-carousel__arrow--left': {
         height: 80,
         left: 0,
         borderBottomRightRadius: 25,
         borderTopRightRadius: 25,
      },
      '& .carousel-container': {
         //  margin: '0 1rem',
      },
   },
}));

export const responsive = {
   superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1400 },
      items: 5,
      slidesToSlide: 3,
   },
   Largedesktop: {
      breakpoint: { max: 1400, min: 1200 },
      items: 4,
      slidesToSlide: 2,
   },
   desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 3,
      slidesToSlide: 1, //
   },
   tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 3,
      slidesToSlide: 1, //
   },
   smTablet: {
      breakpoint: { max: 785, min: 576 },
      items: 2,
   },
   smMobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
   },
};
