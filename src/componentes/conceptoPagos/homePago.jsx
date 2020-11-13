import React from "react";
import { useStyles } from "./styles";
import TablaMontos from "./component/tablaMontos";
import AgregarServicio from "./component/agregarServicio";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import './styles/homePago.css';

function HomePagos() {
  const classes = useStyles();
  const[actualizar,setActualizar] = React.useState(true)
  const [concepto, setConcepto] = React.useState([]);
  const[loader, setLoader] =React.useState(false)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loader}>
				<CircularProgress color="inherit" />
			</Backdrop>
      <div className='box-home-pagos'>
        <div className='box-card-servicios'>
            <AgregarServicio actualizar={actualizar} setActualizar={setActualizar} concepto={concepto} setLoader={setLoader} />
        </div>
        <div className='box-card-tabla'>
            <TablaMontos actualizar={actualizar} setConcepto={setConcepto} concepto={concepto} />
        </div>
      </div>
    </div>
  );
}

export default HomePagos;
