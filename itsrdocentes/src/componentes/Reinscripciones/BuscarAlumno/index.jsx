import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SelectPeriodo from '../Periodo';
import TextField from '@material-ui/core/TextField';


 function BuscarAlumno({periodos,setPeriodos,BuscaNumeroControl,setBuscarNumeroControl}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="default"
        startIcon={<SearchIcon />}
        onClick={handleClickOpen}
      >
        Buscar Alumno
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Ingrese un numero de control"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TextField
                    size="small"
                    id='control-number'
                    fullWidth
                    value={BuscaNumeroControl}
                    label='No. de Control'
                    variant="outlined"
                    onChange={(evt)=>(setBuscarNumeroControl(evt.target.value))}
                  />
           <SelectPeriodo 
           periodos={periodos} 
           setPeriodos={setPeriodos}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Buscar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BuscarAlumno