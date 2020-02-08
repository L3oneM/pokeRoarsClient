import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Roar from '../../components/Roar/Roar';
import StaticProfile from '../../components/StaticProfile/StaticProfile';
import RoarSkeleton from '../../utils/RoarSkeleton';
import ProfileSkeleton from '../../utils/ProfileSkeleton';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    roarIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const roarId = this.props.match.params.roarId;

    if (roarId) this.setState({ roarIdParam: roarId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { roars, loading } = this.props.data;
    const { roarIdParam } = this.state;

    const roarsMarkup = loading ? (
      <RoarSkeleton />
    ) : roars === null ? (
      <p>No roars from this user</p>
    ) : !roarIdParam ? (
      roars.map(roar => <Roar key={roar.roarId} roar={roar} />)
    ) : (
      roars.map(roar => {
        if (roar.roarId !== roarIdParam)
          return <Roar key={roar.roarId} roar={roar} />;
        else return <Roar key={roar.roarId} roar={roar} openDialog />;
      })
    );

    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {roarsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
