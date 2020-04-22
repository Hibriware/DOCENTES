import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { dataMateria } from '../../../home';
import { useStyles } from './dialogos_principal';
import 'jspdf-autotable';
import { ButtonPdf } from './btn_Pdf'


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
          <ButtonPdf/>
        </div>
      </Container>
    </React.Fragment>











  );
}