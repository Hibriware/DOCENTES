import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Container,
    Grid,
    Paper,
    FormControlLabel,
    Switch,
    Chip
} from '@material-ui/core';

function Acceso() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    status: true,
    jason: false,
    antoine: true,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
  };

  const saveChanges =()=>{
        alert("Guardando")
  }

  return (
    <div>
      <Button  size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
        Acceso
      </Button>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">{"Permitir acceso "}</DialogTitle>
        <DialogContent>
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
        <Button disabled size="small" variant="outlined" onClick={saveChanges}>Aplicar cambios</Button>
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