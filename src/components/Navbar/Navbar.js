import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MyButton from '../../utils/MyButton';
import PostRoar from '../PostRoar/PostRoar';
import Notifications from '../../components/Notifications/Notifications';

import HomeIcon from '@material-ui/icons/Home';

import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import './navbar.styles.css';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment>
              <PostRoar />
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                SignUp
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
