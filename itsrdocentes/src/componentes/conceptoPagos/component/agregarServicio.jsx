import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ButtonAgregar from "./buttonAgregar";
import CardAgregar from './cardAgregar';
import CardEditar from './cardEditar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function AgregarServicio({setActualizar,actualizar,concepto, setLoader}) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={4} spacing={2}>
      <CardAgregar actualizar ={actualizar} setActualizar={setActualizar} concepto={concepto} setLoader={setLoader} />
      </Grid>
      <Grid item xs={4} spacing={2}>
      <CardEditar actualizar ={actualizar} setActualizar={setActualizar}  concepto={concepto} setLoader={setLoader} />
      </Grid>
    </Grid>
  );
}

export default AgregarServicio;
