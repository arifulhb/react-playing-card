import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { compose } from 'redux';
import { Button } from '@material-ui/core';
import axios from 'axios';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
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
        people : 4
    };

    componentDidMount() {
    // only fetch data if it does not already exist
    if (!this.props.data) this.props.getData();
  }

  handleClickGo = (e)=>{
      e.preventDefault();
      console.log('total: '+this.state.people);

      console.log('token ', window.myToken.csrfToken);

      axios.post('/api/get-cards', {
          _token: window.myToken.csrfToken,
          people: this.state.people
      })
        .then(function (response) {

            console.log(response);

        })
        .catch(function (error) {
            console.error(error);
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

    // console.log('classes ', classes.padding);

    if (!data) return 'Loading async data...';
    return (

      <div className=''>
        <Typography color="inherit" className={classes.welcome}
                    variant='h5'>Welcome to Card Dist
        </Typography>
        <div>

            <MuiThemeProvider theme={theme}>
                <TextField className={classes.input}
                    onChange={this.handlePlayerNumberChange}
                    label="Add Player Number"
                    value={this.state.people}
                    id="mui-theme-provider-standard-input"
                />
            </MuiThemeProvider>

            <br/>
            <Button variant="contained" color="primary"
                onClick={this.handleClickGo}
                className={classes.button}
            >Go</Button>
        </div>
      </div>
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

export default compose(withStyles(styles))(Home);
