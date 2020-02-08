import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Roar from '../../components/Roar/Roar';
import Profile from '../../components/Profile/Profile';
import RoarSkeleton from '../../utils/RoarSkeleton';

import Grid from '@material-ui/core/Grid/Grid';

import { connect } from 'react-redux';
import { getRoars } from '../../redux/actions/dataActions';

class Home extends Component {
  componentDidMount() {
    this.props.getRoars();
  }

  render() {
    const { roars, loading } = this.props.data;
    let recentRoarsMurkup = !loading ? (
      roars.map(roar => <Roar key={roar.roarId} roar={roar} />)
    ) : (
      <RoarSkeleton />
    );

    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentRoarsMurkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getRoars: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = {
  getRoars
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
