/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { compose } from 'redux';
// import styles from './App.scss';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';


const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: { useNextVariants: true },
  });


const styles = {
    root: {
        padding: 0,
        margin: 0,
        flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    layout: {
        width: 'auto',
        margin: 0,
        // marginLeft: theme.spacing.unit * 3,
        // marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
          width: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class App extends Component {

    handle_home_click = () => {
        return this.props.history.push('/')
    }

    handle_about_click = () => {
        return this.props.history.push('/about')
    }

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="inherit" onClick={this.handle_home_click}>
                                <Typography variant="h6" color='inherit'>
                                Card Distribution
                                </Typography>
                            </Button>
                            <Button color="inherit"
                                    onClick={this.handle_about_click}>About</Button>
                        </Toolbar>
                    </AppBar>

                    <main className={styles.layout}>
                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Paper className={classes.paper}>
                                    <br/>
                                    {this.props.children}
                                </Paper>
                            </Grid>
                        </Grid>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

export default compose(
        withStyles(styles),
    )(withRouter(App));
