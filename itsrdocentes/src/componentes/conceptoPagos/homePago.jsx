import React from "react";
import { useStyles } from "./styles";
import Grid from "@material-ui/core/Grid";
import TablaMontos from "./component/tablaMontos";
import AgregarServicio from "./component/agregarServicio";

function HomePagos() {
  const classes = useStyles();
  const[actualizar,setActualizar] = React.useState(true)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <AgregarServicio actualizar={actualizar} setActualizar={setActualizar}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/*<Paper className={classes.paper}>
          </Paper>*/}
            <TablaMontos actualizar={actualizar}/>
    
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePagos;
