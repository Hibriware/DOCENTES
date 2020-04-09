import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { dataMateria } from '../../../home';
import {getReporteHorarios, getReporteLista} from '../../servicios/api';
import {dataReportHorario, dataReportLista} from '../../servicios/api';
import {useStyles} from './dialogos_principal';
import moment from 'moment';
import  jsPDF  from  'jspdf'
import 'jspdf-autotable'

export default function ComposedTextField() {


  const informacionPdf = async () =>{//http://localhost:4000/api/personal/consultar/reporte/lista/7/403/251/11
    try {
        const DOCENTE_ACTUAL=dataMateria[0].nameDocente;
    for (let index = 0; index < dataMateria.length; index++) {
          console.log("1")
          const ID_MATERIA = dataMateria[index].idMateria;
          const PERIODO = dataMateria[index].idnomenclaturaPeriodo;
          const GRUPO = dataMateria[index].idGrupos;
          const Materia = dataMateria[index].nombre;

          await Promise.all([getReporteHorarios(PERIODO,ID_MATERIA,GRUPO),getReporteLista(PERIODO,ID_MATERIA,GRUPO)])
          console.log("2")
          await pdfAsistencia(Materia,DOCENTE_ACTUAL)
          console.log("3")
        }
    
    } catch (error) {
      console.log(error)
    }
      }
      
 
  const pdfAsistencia =(nomMateria,docente_actual)=>{
    const Horas_clases = dataReportHorario[0].semanas;
    const Grupo = dataReportHorario[0].grupo;
    const Semestre = dataReportHorario[0].semestre;
    console.log("4")

    console.log(Horas_clases)

    const pdf = new jsPDF('p', 'pt', 'letter')
    pdf.setFontSize(14)
    pdf.text(130, 15, 'INSTITUTO TECNOLOGICO SUPERIOR DE LOS RIOS')
    pdf.line(100, 17, 500, 17) // horizontal line
    pdf.setFontSize(8)
    pdf.text(262,26,"Lista de asistencia");
    pdf.roundedRect(102, 31, 400, 12,3,3)
    pdf.setFontSize(7)
    pdf.text(122,40,Horas_clases);
    pdf.setFontSize(8)
    pdf.text(100,56,`MATERIA: ${nomMateria}`);
    
    pdf.setFontSize(8)
    pdf.text(500,56,`GRUPO: ${Semestre} ${Grupo}` );
    pdf.setFontSize(8)
    pdf.text(100,66,`DOCENTE: ${docente_actual}`);
    pdf.setFontSize(8)
    pdf.text(500,66,`FECHA: ${moment().format('L')}`);
    
    var columns = [{ title: "Control", dataKey: "numeroControl" },{ title: "Nombre", dataKey: "nombre" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "C", dataKey: "modalidad" },
  ];
    
    pdf.autoTable(columns,dataReportLista,
    { margin:{ top: 75 },
    styles: { halign: 'center', cellPadding: 0.5,fontSize:7},
    theme:'grid',
    
  }   
  
    );

//piede paginas
    const pageCount = pdf.internal.getNumberOfPages();
// For each page, print the page number and the total pages
for(var i = 1; i <= pageCount; i++) {
     // Go to page i
    pdf.setPage(i);
    pdf.setFontSize(7)
    pdf.text( 20,760,"C (Curso, R:Repetición, E:Especial)");
    
    pdf.line(390, 760, 500, 760) 
    pdf.setFontSize(7)
    pdf.text( 413,767,"FIRMA DOCENTE");
     //Print Page 1 of 4 for example
    pdf.text( 20,770,'Pagina' + String(i) + ' de ' + String(pageCount),null,null,null,null,"right");
}
    
    pdf.save(nomMateria+'.pdf');
    console.log(dataReportLista)

  }



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
       onClick={informacionPdf}
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