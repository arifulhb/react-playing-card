import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { compose } from 'redux';
import { Button, Paper, Grid, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
    margin: {
      margin: theme.spacing.unit,
    },
    welcome: {
        margin: '10px 10px 30px 10px'
    },
    button: {
        margin: theme.spacing.unit,
        marginBottom: '30px'
      },
    padding: {
        padding: '20px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    input: {
        margin: '0 0 20px 0'
    }
  });

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: { useNextVariants: true },
  });

  class Home extends Component {

    state = {
        people : 4,
        submit: false,
        error: {
            status: false,
            message: ''
        }
    };

  componentDidMount() {
    // only fetch data if it does not already exist
    if (!this.props.data) this.props.getData();
  }

  handleClickGo = (e)=> {

      e.preventDefault();
      const that = this;

      that.setState((state, props) => (
        {
            error: {
                status: false,
                message: ''
            },
            submit: true
        })
     );

      axios.post('/api/get-cards', {
          _token: window.myToken.csrfToken,
          people: this.state.people
      })
        .then(function (response) {

            if(response.status === 200){

                return that.props.history.push({
                    pathname: '/result',
                    state: {
                        peoples: response.data.peoples,
                        cards: response.data.cards
                    },
                });
            }


        })
        .catch(function (error) {
            // catch error message here and set via state
            console.log(error.response.data, error.response.status);
            if (error.response.status === 422){

                let message = "";

                _.each(error.response.data.errors.people, function(value, key){
                    message += value;
                });

                that.setState((state, props) => (
                    {
                        error: {
                            status: true,
                            message: message
                        },
                        submit: false
                    })
                 );
            }
        });

  }

  handlePlayerNumberChange = (e) => {

    let value = e.target.value;
    this.setState((state, props) => (
        {
            people: value
        })
     );
  }



  render() {
    const classes = this.props.classes;
    const { data } = this.props;

    if (!data) return 'Loading async data...';
    return (

        <Grid container spacing={24}>
            <Grid item xs>
                <Paper className={classes.paper}>
                    <Typography color="inherit" className={classes.welcome}
                                variant='h5'>Welcome to Card Dist
                    </Typography>
                    <div>

                        <MuiThemeProvider theme={theme}>
                            <TextField className={classes.input}
                                onChange={this.handlePlayerNumberChange}
                                label="Add Player Number"
                                value={this.state.people}
                                error={this.state.error.status}
                                helperText={this.state.error.message}
                                id="mui-theme-provider-standard-input"
                            />
                        </MuiThemeProvider>

                        <br/>
                        <Button variant="contained" color="primary" disabled={this.state.submit}
                            onClick={this.handleClickGo}
                            className={classes.button}
                        >Go {this.state.submit === true ? <CircularProgress size={24} className={classes.buttonProgress} />: ''}</Button>
                    </div>

                </Paper>
            </Grid>
        </Grid>

    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    text: PropTypes.string
  }),
  getData: PropTypes.func.isRequired
};

Home.defaultProps = {
  data: null,
};

export default compose(withStyles(styles))(withRouter(Home));
