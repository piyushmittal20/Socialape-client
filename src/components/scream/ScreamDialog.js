import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import CommentForm from './CommentForm';
import Comments from './Comments';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { getScream, clearErrors } from '../../redux/actions/dataAction';
import { UnfoldMore } from '@material-ui/icons';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
    invisibleSperator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    DialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '88%',
        top: '2%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: 20
    }
}

class ScreamDialog extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        this.setState({ open: false })
        this.props.clearErrors()
    }
    render() {
        const { classes, scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI: { loading } } = this.props;
        const dialogMarkup = loading ? (
            <LinearProgress />
        ) : (
                <Grid container spacing={3}>
                    <Grid item>
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h6"
                            to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSperator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSperator} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <LikeButton screamId={screamId} />
                        <span>{likeCount} likes</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} comments</span>
                    </Grid>
                    <Grid item>
                        <Comments comments={comments} />
                    </Grid>
                    <CommentForm screamId={screamId} />
                </Grid>
            )
        const closeButton = !loading ? (
            <MyButton
                tip="Close"
                onClick={this.handleClose}
                tipClassName={classes.closeButton}
            >
                <CloseIcon color="secondary" />
            </MyButton>
        ) : null;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    {closeButton}
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));