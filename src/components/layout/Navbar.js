import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <Appbar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream />
                            <Link to='/'>
                                <MyButton tip="Home">
                                    <HomeIcon />
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <Notifications />
                            </MyButton>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color='inherit' component={Link} to='/login'>Login</Button>
                                <Button color='inherit' component={Link} to='/'>Home</Button>
                                <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                            </Fragment>
                        )
                    }
                </Toolbar>
            </Appbar >
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
