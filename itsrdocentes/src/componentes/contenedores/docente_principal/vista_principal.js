import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
//buton
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
}));

export default function ComposedTextField() {
  const [name, setName] = React.useState('');
  const classes = useStyles();

  const handleChange = event => {
    setName(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
   <Grid container spacing={1}>

   <Grid item xs={6} sm={12}>
   <FormControl variant="outlined" spacing={2}>
        <InputLabel htmlFor="component-outlined">Nombre Docente</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Nombre Docente" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Clave Docente</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Clave Docente" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Division Academica</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Division Academica" />
      </FormControl>
   </Grid>
   
   <Grid item xs={12} sm={12}>
   <Button
        variant="contained"
        color="default"
        startIcon={<GetAppIcon />}
      >
        Descargar lista de asistencia
      </Button>
       </Grid>

   </Grid>
      
    
      
     
      
    </form>
  );
}