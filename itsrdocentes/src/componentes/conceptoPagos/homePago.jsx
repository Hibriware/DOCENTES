import React from "react";
import { useStyles } from "./styles";
import Grid from "@material-ui/core/Grid";
import TablaMontos from "./component/tablaMontos";
import AgregarServicio from "./component/agregarServicio";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

function HomePagos() {
  const classes = useStyles();
  const[actualizar,setActualizar] = React.useState(true)
  const [concepto, setConcepto] = React.useState([]);
  const[loader, setLoader] =React.useState(false)

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loader}>
				<CircularProgress color="inherit" />
			</Backdrop>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <AgregarServicio actualizar={actualizar} setActualizar={setActualizar} concepto={concepto} setLoader={setLoader} />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/*<Paper className={classes.paper}>
          </Paper>*/}
            <TablaMontos actualizar={actualizar} setConcepto={setConcepto} concepto={concepto} />
    
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePagos;
