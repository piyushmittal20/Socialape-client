import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitComment } from '../../redux/actions/dataAction';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = {
    form: {
        textAlign: 'center',
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: '20px',
        position: 'relative',
        marginBottom: 10,
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    }
}

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '' })
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body })
    }
    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on scream"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField} />
                    <Button type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Submit
                    </Button>

                </form>
                <hr className={classes.visibleSeperator} />
            </Grid>
        ) : null;
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapstateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    submitComment
}

export default connect(mapstateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));
