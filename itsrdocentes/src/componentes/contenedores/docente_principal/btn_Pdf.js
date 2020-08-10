import  React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { dataMateria } from '../../../home';
import { getReporteHorarios, getReporteLista, dataReportHorario, dataReportLista, dataPeriodo} from '../../servicios/api';
import Itsr from '../../img/Logo-Tec.png';

export const ButtonPdf =  (data) =>{
  console.log('memo button')
  const [activo, setActio] = React.useState(false)
    
  const informacionPdf = async () => {//http://localhost:4000/api/personal/consultar/reporte/lista/7/403/251/11
    try {
      setActio(true)
      const DOCENTE_ACTUAL = dataMateria[0].nameDocente;
      for (let index = 0; index < dataMateria.length; index++) {
        const ID_MATERIA = dataMateria[index].idMateria;
        const PERIODO = dataMateria[index].idnomenclaturaPeriodo;
        const GRUPO = dataMateria[index].idGrupos;
        const Materia = dataMateria[index].nombre;

        await Promise.all([getReporteHorarios(PERIODO, ID_MATERIA, GRUPO), getReporteLista(PERIODO, ID_MATERIA, GRUPO)])

        await pdfAsistencia(Materia, DOCENTE_ACTUAL)
      }
      setActio(false)
    } catch (error) {
      console.log(error)
    }
  }

  const pdfAsistencia = (nomMateria, docente_actual) => {
    const Horas_clases = dataReportHorario[0].semanas;
    const Grupo = dataReportHorario[0].grupo;
    const Semestre = dataReportHorario[0].semestre;
    var img = new Image();

    img.src = Itsr;
    const pdf = new jsPDF('p', 'pt', 'letter')

    
    var columns = [
      { title: "Nº", dataKey: "nm" },
      { title: "Control", dataKey: "numeroControl" },
    { title: "Nombre", dataKey: "nombre" ,},
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "A", dataKey: "A" },
    { title: "N", dataKey: "N" },
    { title: "O", dataKey: "O" },
    { title: "T", dataKey: "T" },
    { title: "A", dataKey: "A" },
    { title: "C", dataKey: "C" },
    { title: "I ", dataKey: "I" },
    { title: "O ", dataKey: "O" },
    { title: "N ", dataKey: "N" },
    { title: "E ", dataKey: "E" },
    { title: "S ", dataKey: "S" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "", dataKey: "" },
    { title: "C", dataKey: "modalidad" },
    ];
    //dataReportLista,
    pdf.autoTable(columns,dataReportLista, 
      {
        margin: { top: 75 },
        styles: { halign:'center',cellPadding: 0.5, fontSize: 7 },
        theme: 'grid',
        columnStyles: { 2: { halign: 'left' } },
       
      }
    );


    //piede paginas
    const pageCount = pdf.internal.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
      pdf.setPage(i);


    pdf.setFontSize(14)//encabezado
    pdf.text(130, 15, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS')
    pdf.line(100, 17, 500, 17) // horizontal line
    pdf.setFontSize(8)
    pdf.text(262, 26, "PRELISTA");
    pdf.roundedRect(102, 45, 400, 12, 3, 3)
    pdf.setFontSize(8)
    pdf.text(100, 40, `MATERIA: ${nomMateria}`);
    pdf.setFontSize(8)
    pdf.text(500, 31, `PERIODO: ${dataPeriodo[0].rango}`);
    pdf.setFontSize(8)
    pdf.text(500, 40, `FECHA: ${moment().format('DD/MM/YYYY')}`);
    pdf.setFontSize(7)
    pdf.text(122, 54, Horas_clases);
    pdf.setFontSize(8)
    pdf.text(500, 66, `GRUPO: ${Semestre} ${Grupo}`);
    pdf.setFontSize(8)
    pdf.text(100, 66, `DOCENTE: ${docente_actual}`);
    pdf.addImage(img, 'PNG', 13, 10, 63, 63)


      pdf.setFontSize(7)//pie de pagina
      pdf.text(20, 760, "C= curso (O: Ordinario, R: Repetición, E: Especial)");
      pdf.setLineWidth(1.6)
      pdf.line(390, 760, 500, 760)
      pdf.setFontSize(7)
      pdf.text(413, 767, "FIRMA DOCENTE");
      pdf.text(20, 770, 'Pagina' + String(i) + ' de ' + String(pageCount), null, null, null, null, "right");
    }
    pdf.save(nomMateria + '.pdf');
    console.log(dataReportLista)
  }
  

    
    return(
        <div>
        <Button
            disabled={activo}
            onClick={informacionPdf}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<GetAppIcon />}>
            lista de asistencia
        </Button>
        </div>
    );
}