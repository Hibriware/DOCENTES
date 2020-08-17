import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,Container,Typography,FormControlLabel,TextField,Checkbox,Avatar,Chip
  } from '@material-ui/core';
  import {useStudent} from '../providers/StudentProvider';
  import Itsr from '../../img/Logo-Tec.png';
  import swal from 'sweetalert';
 


  interface State {
    otros:boolean,
    incumplimiento:boolean,
    comentario:string
  }


const BajaDefinitiva = ()=>{

        const {student} = useStudent();
          const [open, setOpen] = React.useState(false);
          const [state, setState] = React.useState<State | any>({
            otros:false,
            incumplimiento:false,
            periodoAgotados:false,
            noAcreditoEspesial:false,
            comentario:''
          });
      
      
        const handleClickOpen = () => {
            if(student?.controlNumber.length){
              setOpen(true);
            }else{
              swal({
                text: "Primero realice una búsqueda!",
              });
            }
          
        };
      
        const handleClose = () => {
          setOpen(false);
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, 
              [event.target.name]: event.target.checked 
            });
         }
         const registrarBajaDefinitiva = async()=>{

         }

return(
    <div>
    <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
      Baja Definitiva
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
    <DialogTitle id="alert-dialog-title">{"BAJA DEFINITIVA"}</DialogTitle>
      <DialogContent>
      <Container maxWidth="sm" style={{  height: '50vh', width:'100vh' }}>
       <Grid container spacing={3}>
          <Grid item xs={12}>
             <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                >
                    <Grid item xs={8}>
                     <Chip
                        avatar={<Avatar alt="Natacha" src={Itsr} />}
                        label="INSTITUTO TECNOLOGIGO SUPERIOR DE LOS RIOS"
                    />
                </Grid>
                </Grid>
          </Grid>
          <Grid item xs={12}>
                   <Grid container direction="row" justify="flex-end" alignItems="baseline">
                       <Grid item xs={4}>
                          <Typography variant="body2" gutterBottom>
                               Periodo:ENE-AGOST-21
                          </Typography>
                          </Grid>
                      <Grid item xs={4}>
                          <Typography variant="body2" gutterBottom>
                              Fecha:23/34/3433
                          </Typography>
                      </Grid>
                  </Grid>
          </Grid>
          <Grid item xs={12}>
              <Grid container direction="row" justify="center" alignItems="baseline">
                <Grid item xs={3}>
                  <Typography variant="body2" gutterBottom>
                      N.C:{student?.controlNumber}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body2" gutterBottom>
                      Nombre: {`${student?.firstName} ${student?.fatherName} ${student?.motherName}`}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" gutterBottom>
                      NPRT: {student?.nextSemester}
                  </Typography>
                </Grid>
              </Grid>
          </Grid>
          <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="baseline"
          >
              <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                      Motivo(s):
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                   control={
                   <Checkbox 
                    checked={state.incumplimiento}
                    onChange={handleChange} 
                    name="incumplimiento" />}
                    label="INCUMPLIMIENTO REGLAMENTARIO"
                   />
                   <FormControlLabel
                   control={
                   <Checkbox 
                    checked={state.noAcreditoEspesial}
                    onChange={handleChange} 
                    name="noAcreditoEspesial"
                    />}
                    label="NO ACREDITACIÓN DE CURSO ESPESIAL"
                   />
                    <FormControlLabel
                    
                    control={   
                    <Checkbox 
                        checked={state.periodoAgotados}
                        onChange={handleChange} 
                        name="periodoAgotados" />}
                        label="AGOTÓ SUS 12 PERIODOS"
                   />
                
                </Grid>
                <Grid item xs={4}>
                <FormControlLabel
                   control={
                   <Checkbox
                    checked={state.otros} 
                    onChange={handleChange} 
                    name="otros" />}
                    label="OTRO"
                   />
                </Grid>
                <Grid item xl={12}>
                <TextField
                disabled={!state.otros}
                    id="filled-multiline-static"
                    label=""
                    name="comentario"
                    multiline
                    rows={4}
                    variant="filled"
                    style={{width: '50ch'}}
                    fullWidth={true} 
                    value={state.comentario}
                    onChange={(evt)=>setState({
                      ...state,
                      comentario:evt.target.value
                    })}
                  />
                </Grid>
          </Grid>

       </Grid>
      </Container>    
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          cancelar
        </Button>
        <Button onClick={registrarBajaDefinitiva} color="primary" autoFocus>
          confirmar
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}

export default BajaDefinitiva;