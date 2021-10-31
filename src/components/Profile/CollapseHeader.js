import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IconButton, Typography, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Box } from '@material-ui/system';
import styles from 'Styles/Profile/ProfileTabStyles';

const CollapseHead = (props) => {
  const { title, subTitle, children } = props;
  const classes = styles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded((st) => !st);
  };

  return (
    <>
      <Box className={classes.box} sx={{ my: 2 }}>
        <Typography variant='subtitle2' color='textSecondary'>
          {title}
        </Typography>
        <Typography variant='h5'>{subTitle}</Typography>
        <IconButton
          disableRipple
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='Show more'
        >
          <ExpandLessIcon />
        </IconButton>
      </Box>
      <Collapse
        className={classes.collapse}
        in={expanded}
        timeout='auto'
        unmountOnExit
      >
        <Box className={classes.content}>{children}</Box>
      </Collapse>
    </>
  );
};

CollapseHead.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default CollapseHead;
