import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  ...theme.globalStyles
});

const NoProfile = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant='body2' align='center'>
        No profile found, please login again
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/login'
        >
          Login
        </Button>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/signup'
        >
          Signup
        </Button>
      </div>
    </Paper>
  );
};

NoProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoProfile);
