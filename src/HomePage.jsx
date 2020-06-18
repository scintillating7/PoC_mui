import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  placeHolder: {
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(25),
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Typography className={classes.placeHolder} align='center'>This is a homepage</Typography>
  );
}
