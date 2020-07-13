import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SelectConcepto from './selectServicio';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Editar
        </Typography>
        <SelectConcepto/>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
          <TextField id="standard-basic" label="Concepto" />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Actalizar Costo</Button>
      </CardActions>
    </Card>
  );
}