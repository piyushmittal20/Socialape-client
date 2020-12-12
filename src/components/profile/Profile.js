import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, uploadImage } from '../../redux/actions/userAction';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday'
import dayjs from 'dayjs';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 190,
            height: 190,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        },
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    root: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
};


class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name)
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                        <MyButton tip="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName="button">
                            <EditIcon color="primary" />
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h6">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> <span>{location}</span>
                            </Fragment>
                        )}
                        <hr />
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <MyButton tip="logout" onClick={this.handleLogout}>
                        <KeyboardReturn color="primary" />
                    </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No Profile found, please login again
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                    </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                    </Button>
                    </div>
                </Paper>
            )) : (
                <Paper className={classes.paper}>
                    <div className={classes.root}>
                        <CircularProgress color="secondary" />
                    </div>
                </Paper>
            )
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    uploadImage,
    logoutUser
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
