import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

import MyButton from '../../utils/MyButton';
import DeleteRoar from '../DeleteRoar/DeleteRoar';
import RoarDialog from '../RoarDialog/RoarDialog';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography/Typography';

import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import LikeButton from '../LikeButton/LikeButton';

const styles = theme => ({
  ...theme.globalStyles,
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
});

export class Roar extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      roar: {
        body,
        createdAt,
        userImage,
        userHandle,
        roarId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteRoar roarId={roarId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile image'
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color='primary'
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton roarId={roarId} />
          <span>{likeCount} Likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comments</span>
          <RoarDialog
            roarId={roarId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Roar.propTypes = {
  user: PropTypes.object.isRequired,
  roar: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Roar));
