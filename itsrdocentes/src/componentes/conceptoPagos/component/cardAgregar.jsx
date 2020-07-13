import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { crearRegistroConcepto } from "../servicios/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({setActualizar,actualizar}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    concepto: "",
    costo: "",
    clave: "",
  });

  const handlenChange = (evt) => {
    console.log(evt.target.value);
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const guardar = async () => {
    if (state.clave && state.concepto && state.costo) {
      await crearRegistroConcepto(state);
      setActualizar(!actualizar)
    } else {
      console.log("ingrese todo los datos");
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Agregar servicio
        </Typography>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <TextField
              name="concepto"
              id="standard-basic"
              label="Concepto"
              onChange={handlenChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="costo"
              id="standard-basic"
              label="$ Costo"
              onChange={handlenChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="clave"
              id="standard-basic"
              label="Clave"
              onChange={handlenChange}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={guardar} size="small">
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
}
