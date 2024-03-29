import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SelectConcepto from "./selectServicio";
import Grid from "@material-ui/core/Grid";
//import TextField from "@material-ui/core/TextField";
import InputCosto from './inputNumero';
import { putConcepto } from "../servicios";
import * as toastr from 'toastr';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background:'gainsboro'
    
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

export default function SimpleCard({actualizar, setActualizar, concepto,setLoader}) {//setLoader={setLoader} loader={loader}
  const classes = useStyles();
  const [state, setState] = React.useState("");
  const [costo, setCosto] = React.useState("");
  const [active, setActive] = React.useState(false);

  const handleChange = (evt) => {
    setCosto(evt.target.value);
  };

  const guardar = async () => {
    setActive(true)
    setLoader(true)
    if (state && costo) {
      await putConcepto(state.value, costo);
      setActualizar(!actualizar);
      setCosto("")
      setState("")
			toastr.success(`Nuevo costo actualizado`, 'Nota');

    } else {
			toastr.warning(`Ingrese un costo`, 'Nota');

    }
    setLoader(false)
    setActive(false)
  };

  return (
    <div style={{background:'gainsboro',width:'max-content',borderRadius:'6px'}}>
      <Typography
          className={classes.title}
          style={{marginLeft:'11px'}}
          color="textSecondary"
          gutterBottom
        >
          Editar
        </Typography>
      <div style={{padding:'4px'}} >
        <SelectConcepto setState={setState} state={state}  concepto={concepto} setCosto={setCosto}/>
      </div>
    <Card className={classes.root} variant="elevation">
      <CardContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <InputCosto _handlenChange={handleChange} costo={costo} />
            {/*<TextField
            type="number"
              id="standard-basic"
              label="$Costo"
              value={costo}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10 || 0))
                  .toString()
                  .slice(0, 20);
              }}
            />*/}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button disabled={active} size="small" onClick={guardar}>
          Actalizar Costo
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
