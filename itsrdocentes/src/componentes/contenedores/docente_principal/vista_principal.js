import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
//buton
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { dataMateria } from '../../../home'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },

  },
  pdfss:{
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      margin: theme.spacing(1),
      
    }},
  }));

export default function ComposedTextField() {
  const [name, setName] = React.useState('');
 
   const [perfil, setPerfil] = React.useState(dataMateria);

  

  const classes = useStyles();

  const handleChange = event => {
    setName(event.target.value);
  };

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
    <div className={classes.avatar}>
    <Avatar src="/broken-image.jpg" />
    </div>
      <Typography variant="button" display="block" gutterBottom>
        Nombre: {dataMateria[0].nameDocente}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        Clave: {dataMateria[0].clavePersonal}
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        Divicion: {dataMateria[0].nombreCorto}
      </Typography>
      <div className={classes.pdfss}>
      <Button 
      
        variant="contained"
        color="default"
        startIcon={<GetAppIcon />}
      >
        Descargar lista de asistencia
      </Button>
      </div>
    </Container>
    
  </React.Fragment>
   
  
      

   
      
    
      
     
      
    
  );
}