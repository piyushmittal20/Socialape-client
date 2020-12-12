import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataAction';

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

class home extends Component {
    componentDidMount() {
        this.props.getScreams()
    }
    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
        ) : (
                <div style={{
                    textAlign: 'center',
                    marginTop: 50,
                    marginBottom: 50
                }}>
                    <CircularProgress color="secondary" size={100} />
                </div>
            );
        return (
            <Grid container spacing={7}>
                <Grid item md={8} sm={12} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(home)
