import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { dataReportHorario, getReportList, getReportSchedule, dataReportLista} from '../../servicios/api';
import {list_subject} from '../constants/end-points';
import Axios from 'axios';
import {img} from '../../boletasCalificacion/pdf/img';

 
    
   export const allInformacionPdf = async (dataDocente,periodo) => {//http://localhost:4000/api/personal/consultar/reporte/lista/7/403/251/11
    try {
     let DATA_MATERIAS =[];
     const[infoTeacher]=dataDocente;
     const infoPeriod =periodo;

    await Axios.get(list_subject,{
         params:{
             periodo:infoPeriod.idnomenclaturaPeriodo,
             idPersonal:infoTeacher.idPersonal
         }
     }).then(data=>DATA_MATERIAS=data.data)
       .catch(err=>console.log(err))
       if(!DATA_MATERIAS.length){
        alert("No se encontraron materias disponibles")
       } 
      const DOCENTE_ACTUAL =infoTeacher.Docente;
      const idPersonal = infoTeacher.idPersonal
      const PERIODO =infoPeriod.idnomenclaturaPeriodo;
for (let index = 0; index < DATA_MATERIAS.length; index++) {

        const ID_MATERIA = DATA_MATERIAS[index].idmaterias;
        const GRUPO = DATA_MATERIAS[index].asignacionGrupo_idgrupo;
        const Materia = DATA_MATERIAS[index].nomcorto;
        const Nombre_Carrera = DATA_MATERIAS[index].carrera.toUpperCase();
        const Clave_Materia = DATA_MATERIAS[index].clave
        const materiaDocenteId = DATA_MATERIAS[index].materiaDocenteId

        await Promise.all([getReportSchedule(PERIODO, ID_MATERIA, GRUPO,materiaDocenteId,idPersonal), getReportList(PERIODO, ID_MATERIA, GRUPO,materiaDocenteId,idPersonal)])

        await pdfAsistencia(Materia, DOCENTE_ACTUAL,Nombre_Carrera,Clave_Materia,infoPeriod);
}
      
    } catch (error) {
      console.log(error)
    }
  }

  const pdfAsistencia = (nomMateria, docente_actual,Nombre_Carrera,Clave_Materia,infoPeriod) => {
    const Horas_clases = dataReportHorario[0].semanas;
    const Grupo = dataReportHorario[0].grupo;
    const Semestre = dataReportHorario[0].semestre;
    
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

    let contador = 1;
    for (let x = 0; x < dataReportLista.length; x++) {
      dataReportLista[x].nm = contador
      contador++
    }

    pdf.autoTable(columns,dataReportLista, 
      {
        margin: { top: 75 },
        styles: { halign:'center',cellPadding: 0.5, fontSize: 7 },
        theme: 'grid',
        columnStyles: { 2: { halign: 'left' } },
       
      }
    );


    const pageCount = pdf.internal.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
      pdf.setPage(i);

    pdf.setFontSize(14)//encabezado
    pdf.text(130, 15, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS')
    pdf.line(100, 17, 500, 17) // horizontal line
    pdf.setFontSize(7)
    pdf.text(262, 25, "PRELISTA");
    pdf.roundedRect(102, 45, 400, 12, 3, 3)
    pdf.setFontSize(8)
    pdf.text(100, 32, `CARRERA: ${Nombre_Carrera}`);
    pdf.setFontSize(8)
    pdf.text(100, 42, `MATERIA: ${Clave_Materia} - ${nomMateria}`);
    pdf.setFontSize(8)
    pdf.text(500, 31, `PERIODO: ${infoPeriod.rango} ${infoPeriod.anio}`);
    pdf.setFontSize(8)
    pdf.text(500, 40, `FECHA: ${moment().format('DD/MM/YYYY')}`);
    pdf.setFontSize(7)
    pdf.text(122, 54, `${Horas_clases}`);
    pdf.setFontSize(8)
    pdf.text(500, 66, `GRUPO: ${Semestre} ${Grupo}`);
    pdf.setFontSize(8)
    pdf.text(100, 66, `DOCENTE: ${docente_actual}`);
    pdf.addImage(img, 'JPEG', 13, 10, 63, 63)

      pdf.setFontSize(7)//pie de pagina
      pdf.text(20, 760, "C= curso (O: Ordinario, R: Repetición, E: Especial)");
      pdf.setLineWidth(1.6)
      pdf.line(390, 760, 500, 760)
      pdf.setFontSize(7)
      pdf.text(413, 767, "FIRMA DOCENTE");
      pdf.text(20, 770, 'Pagina' + String(i) + ' de ' + String(pageCount), null, null, null, null, "right");
    }
    pdf.save(nomMateria + '.pdf');
  }
  
