import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { compose } from 'redux';
import _ from 'lodash';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, Avatar } from '@material-ui/core';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
    },
    cheapRoot: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
    margin: {
      margin: theme.spacing.unit,
    },
    chip: {
        margin: theme.spacing.unit,
      },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 100,
      },
  });

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: { useNextVariants: true },
  });

  class Result extends Component {

    state = {
        cards:  [],
        peoples: []
    }

    handlePlayerNumberChange = (e) => {

        let value = e.target.value;
        this.setState((state, props) => (
            {
                people: value
            })
        );
    }



    renderTableBody = (rows, key) => {

        console.log('pages: ', rows);

        let innerRows = [];

        {
            _.each(rows, function(card, cardKey) {
                innerRows.push(
                    <TableRow key={`row-${key}-${cardKey}`}>
                        <TableCell component="td"> {card.card.short} </TableCell>
                        <TableCell component="td"> {card.page} </TableCell>
                    </TableRow>
                )

            })
        }

        return (
            <TableBody>
                { innerRows}
            </TableBody>
        );
    }


    renderUnusedCards = (cards) => {
        const classes = this.props.classes;
        let chips = [];

        _.each(cards, function(value, key){

            console.log('card ', value.card);
            chips.push(
                <Chip
                    avatar={<Avatar>{value.card.short}</Avatar>}
                    label={value.page}
                    className={classes.chip}
                />
            )
        });

        return (
            <div className={classes.cheapRoot}>{chips}</div>
        )
    }

    renderResult = (peoples) => {

        const classes = this.props.classes;

        let that = this;

        // console.log('peoples ', peoples);
        let rows = [];

        {
            _.each(peoples, function(value, key) {

                console.log('person ', value);

                rows.push(
                    <Grid item xs={3} key={`person-${key}`}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" color="primary"> Person: {value[0]}</Typography>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow key={101}>
                                        <TableCell component="th" scope="row"> Card Type </TableCell>
                                        <TableCell component="th" scope="row"> Number </TableCell>
                                    </TableRow>
                                </TableHead>
                                { that.renderTableBody(value[1], key)}

                            </Table>
                        </Paper>
                    </Grid>
                );
            })
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>{ rows }</Grid>
            </div>
        );

    }

  render() {
    const classes = this.props.classes;
    // console.log('cards ', this.props.history.location.state.cards);

    return (

      <div className=''>

        <Typography color="inherit" className={classes.welcome}
                    variant='h4'>Cards are distributed
        </Typography>

        <div className={classes.margin}>
            <Grid container spacing={24}>

                <Grid item xs={1}></Grid>

                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Typography color="error">
                            Following cards are not distributed.
                        </Typography>
                        { this.renderUnusedCards( this.props.history.location.state.cards)}

                    </Paper>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>

        { this.renderResult(this.props.history.location.state.peoples) }
      </div>
    );
  }
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
  peoples: PropTypes.array,
  cards: PropTypes.array
};


export default compose(withStyles(styles))(withRouter(Result));
