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
import InputNumeros from './inputNumero';
import * as toastr from 'toastr';


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

async function cleanCadena(value) {
let res=  await value.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  return res; 
}

export default function SimpleCard({
  setActualizar,
  actualizar,
  concepto,
  setLoader,
}) {
  const classes = useStyles();
  const [active, setActive] = React.useState(false);

  const [state, setState] = React.useState({
    concepto: "",
    costo: "",
    clave: "",
  });

  const handlenChange = (evt) => { //.value.toUpperCase() ,
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    });
  };

  const guardar = async () => {
    setActive(true);
    setLoader(true);
    if (state.clave && state.concepto && state.costo) {
      //filtrar clave
      let dataValue = await cleanCadena(state.concepto);
      let resul = await concepto.filter(
        (data) => data.nombreconcepto === dataValue.toUpperCase() || data.nombreconcepto === dataValue || data.nombreconcepto ===  state.concepto
        ); //filtro concepto

      if (resul.length === 0) {
        let cadenaCeros = '00';
      	let resultados = cadenaCeros + state.clave;
        resultados = resultados.substring(resultados.length - cadenaCeros.length);

        let resuClave = await concepto.filter(
          (data) => data.claveconcepto === resultados
        ); //filtro clave
        if (resuClave.length === 0 && resultados!=='01' && resultados!=='00' ) {
          await crearRegistroConcepto(state);
          setActualizar(!actualizar);
          //limpiar
          setState({
            concepto: "",
            costo: "",
            clave: "",
          });
        } else {
			toastr.warning(`La clave ${resultados}, no esta disponible.`, 'Nota');

        }
      } else {
			toastr.warning(`El concepto ${state.concepto}, ya existe.`, 'Nota');

      }
    } else {
      toastr.warning(`Ingrese los datos `, 'Nota');
    }
    setLoader(false);
    setActive(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
        justify="center"
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
              value={state.concepto}
              onChange={handlenChange}
              inputProps={{ maxLength: 30 }}
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
          <InputNumeros _handlenChange={handlenChange} costo={state.costo}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              name="clave"
              id="standard-basic"
              label="Clave"
              value={state.clave}
              onChange={handlenChange}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10 || 0))
                  .toString()
                  .slice(0, 2);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button disabled={active} onClick={guardar} size="small">
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
}
