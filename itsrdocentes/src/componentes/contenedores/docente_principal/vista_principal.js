import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { dataMateria } from '../../../home';
import {useStyles} from './dialogos_principal'

export default function ComposedTextField() {
 

  const classes = useStyles();


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