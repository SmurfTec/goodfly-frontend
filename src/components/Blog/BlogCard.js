import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { styles } from 'Styles/Blog';
import { Box } from '@material-ui/system';

const BlogCard = ({ tag, date, image, title }) => {
  const classes = styles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 330, position: 'relative' }}
          image={image}
          title={title}
        >
          <span className={classes.overlay} />
          <Box className={classes.cardDate}>
            <Typography variant='subtitle2'>{date}</Typography>
          </Box>
          <Typography
            variant='h5'
            className={`${classes.title} ${classes.tag}`}
          ></Typography>
          <Box className={classes.title}>
            <Typography variant='h5' sx={{ fontStyle: 'italic' }}>
              {tag}
            </Typography>
            <Typography variant='h4'>{title}</Typography>
          </Box>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
