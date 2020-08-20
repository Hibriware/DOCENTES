import React, { useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Container,
    Grid,
    Backdrop,
    FormControlLabel,
    Switch,
    Chip,
    CircularProgress
} from '@material-ui/core';
import Axios from 'axios';
import {MODULE_ACCESS_ADMIN_URL,UPDATE_MODULE_ACCESS_ADMIN_URL} from '../constants/end-points';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

function Acceso() {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [statusAcces,setStatusAcces] = React.useState(false)
  const [state, setState] = React.useState({
    status: false,
    nameModule: "altas/bajas",
  });

  useEffect(()=>{
    Axios.get(MODULE_ACCESS_ADMIN_URL,{
      params:{
        nameModule:state.nameModule,
        status:state.status ? 'activo':'disabled'
      }
    }).then((res) =>  {
      if (res.data) {
        const {status} = res.data;
        setState({...state,status:status==='active' ? true:false})
      }
    }).catch((error) => console.log(error));
  },[])

useEffect(()=>{
  try {
    let rolAdmin = JSON.parse(`${sessionStorage.getItem('resul')}`);
    if (rolAdmin.length) {
      const[{nombreRol}] = rolAdmin;
      let ESTATUS = nombreRol === "Administrador";
      setStatusAcces(ESTATUS)
    }
  } catch (error) {
    console.log(error)
  }
},[])

const saveChanges = async ()=>{
  setLoading(!isLoading)
  await Axios.put(UPDATE_MODULE_ACCESS_ADMIN_URL,{
    nameModule:state.nameModule,
    status:state.status ? 'active':'disabled'
  }).then((res)=>alert("Actualizado")).catch((error)=>console.log(error))
  setLoading(false)

}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
  };



  return (
    <div>
      
      { statusAcces ? (<Button  size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
        Acceso
      </Button>):null}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">{"Permitir acceso "}</DialogTitle>
        <DialogContent>
          <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        <Container maxWidth="sm" style={{ backgroundColor: 'ghostwhite',width:'50vh', height: '30vh' }} fixed>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                     {state.status? <Chip label="El (Jefe académico) cuentan con acceso al módulo, altas /bajas" size="medium" color="primary" />:
                                    <Chip label="El (Jefe académico) no cuentan con acceso al módulo, altas /bajas" size="medium" color="secondary" />}
                </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
        <FormControlLabel
          control={ <Switch name="status" checked={state.status} onChange={handleChange} color="primary" />}
          label="Estatus"
          labelPlacement="top"
        />
        </Grid>
        </Grid>
        <Grid item xs={6}>
        <Button  size="small" variant="outlined" onClick={saveChanges}>Aplicar cambios</Button>
        </Grid>
        </Grid>

        </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Terminar
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
  );
}

export default Acceso;