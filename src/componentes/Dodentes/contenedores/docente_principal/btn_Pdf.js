import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
//import { dataMateria } from '../../../home';
import { getReporteHorarios, getReporteLista, dataReportHorario, dataReportLista} from '../../../servicios/api';
import Itsr from '../../../img/Logo-Tec.png';
import {MateriasContext} from "../../../../Context/ListaMateriaDocente/ContextMaterias";
import {PeriodoMateriasContext} from "../../../../Context/PeriodoMateria/ContextPeriodosMateria";

export const ButtonPdf =  (data) =>{
  const {stateMateria,setStateMateria} = useContext(MateriasContext);
  const [statePeriodoMateria] = useContext(PeriodoMateriasContext);
  const [activo, setActio] = React.useState(false)
    
  const informacionPdf = async () => {
    try {
      setActio(true)
      const DOCENTE_ACTUAL = stateMateria[0].nameDocente;
      for (let index = 0; index < stateMateria.length; index++) {
        const ID_MATERIA = stateMateria[index].idMateria;
        const PERIODO = stateMateria[index].idnomenclaturaPeriodo;
        const GRUPO = stateMateria[index].idGrupos;
        const Materia = stateMateria[index].nombre;
        const Nombre_Carrera = stateMateria[index].nombreCorto.toUpperCase() ;
        const Clave_Materia = stateMateria[index].clave_materia

        const materiaDocenteId = stateMateria[index].materiaDocenteId

        await Promise.all([getReporteHorarios(PERIODO, ID_MATERIA, GRUPO,materiaDocenteId), getReporteLista(PERIODO, ID_MATERIA, GRUPO,materiaDocenteId)])

        await pdfAsistencia(Materia, DOCENTE_ACTUAL,Nombre_Carrera,Clave_Materia);
      }
      setActio(false)
    } catch (error) {
      console.log(error)
    }
  }

  const pdfAsistencia = async (nomMateria, docente_actual,Nombre_Carrera,Clave_Materia) => {
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

    //let newlist = await dataReportLista.filter((list,index) => list.estatus !==null)
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
    pdf.text(262, 25, " LISTA DE ALUMNOS INSCRITOS");
    pdf.roundedRect(102, 45, 400, 12, 3, 3)
    pdf.setFontSize(8)
    pdf.text(100, 32, `CARRERA: ${Nombre_Carrera}`);
    pdf.setFontSize(8)
    pdf.text(100, 42, `MATERIA: ${Clave_Materia} - ${nomMateria}`);
    pdf.setFontSize(8)
    pdf.text(500, 31, `PERIODO: ${statePeriodoMateria?.data[0].rango} ${statePeriodoMateria?.data[0].anio}`);
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
    pdf.save(`${Semestre} ${Grupo}) ${nomMateria}.pdf`);
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
