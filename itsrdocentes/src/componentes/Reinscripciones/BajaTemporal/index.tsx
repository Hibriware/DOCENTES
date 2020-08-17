import React from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Chip,
    Avatar,
    Grid,makeStyles, createStyles, Theme,Container,Typography,FormControlLabel,TextField,Checkbox
  } from '@material-ui/core';
import {useStudent} from '../providers/StudentProvider';
import {BAJA_TEMPORAL_URL} from '../constants/end-points';
import Itsr from '../../img/Logo-Tec.png';
import swal from 'sweetalert';


  

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

interface State {
  otros:boolean,
  incumplimiento:boolean,
  comentario:string
}

const BajasTemporal =({periodos}:any)=>{
  const {student} = useStudent();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState<State | any>({
      otros:false,
      incumplimiento:false,
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

  const registrarBajaTemporal = async()=>{
    alert("Desabilitado")
    /*try {
      if (state.comentario.length  || state.incumplimiento) {
        let data  = await axios.post(BAJA_TEMPORAL_URL,{
        motivo_de_baja:state.incumplimiento ? 'INCUMPLIMIENTO REGLAMENTARIO':state.comentario,
        folio:student?.folio,
        nombreAspirante:`${student?.firstName} ${student?.fatherName} ${student?.motherName}`,
        numero_control:student?.controlNumber,
        nombreCarrera:student?.career.shortName,
        idCarrera:student?.career.id,
        periodo:periodos,
        semestre:student?.nextSemester
      })  
        alert(data.data.message)
        setOpen(false);
    }else{
          alert("Por favor escriba el motivo de la baja temporal")
        }  
    } catch (error) {
      alert("Inténtelo más tarde")
    }*/
  }
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, 
              [event.target.name]: event.target.checked 

      });
      }

    return (
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Baja Temporal
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg"
          >
            <DialogTitle id="alert-dialog-title">{"BAJA TEMPORAL"}</DialogTitle>
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
                          disabled={state.otros}
                          checked={state.incumplimiento}
                          onChange={handleChange} 
                          name="incumplimiento" />}
                          label="INCUMPLIMIENTO REGLAMENTARIO"
                         />
                      
                      </Grid>
                      <Grid item xs={4}>
                      <FormControlLabel
                         control={
                         <Checkbox disabled={state.incumplimiento}
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
              <Button disabled={(!state.incumplimiento && !state.otros)} onClick={registrarBajaTemporal} color="primary" autoFocus>
                confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default BajasTemporal;
