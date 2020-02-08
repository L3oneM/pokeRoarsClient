import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteRoar } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.globalStyles,
  deleteButton: {
    position: 'absolute',
    top: '10%',
    left: '90%',
    [theme.breakpoints.down('xs')]: {
      left: '85%'
    }
  }
});

export class DeleteRoar extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteRoar = () => {
    console.log('I Delete');
    this.props.deleteRoar(this.props.roarId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='Delete Roar'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='secondary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Are you sure you want to delete this roar ?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.deleteRoar} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteRoar.propTypes = {
  deleteRoar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  roarId: PropTypes.string.isRequired
};

const mapDispatchToProps = {
  deleteRoar
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(DeleteRoar));
