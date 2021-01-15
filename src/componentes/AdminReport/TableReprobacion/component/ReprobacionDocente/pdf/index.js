import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import Axios from "axios";

/*
* "iddocente": 195,
        "docente": "DANY CAMBRANO ARCOS",
        "materia": "FUNDAMENTOS DE PROG.",
        "grupo": "1",
        "reprobadosHombres": 0,
        "reprobadosMujeres": 0,
        "totalReprobadosMH": 0,
        "aprobadosHombres": 19,
        "aprobadosMujeres": 1,
        "totalAprobadosMH": 20,
        "totalMujeres": 1,
        "totalHombre": 19,
        "totalHM": 20,
        "reprobacion": 0,
        "aprobacion": 100
* */
const columnMateriasCursando = [
    { title: "MATERIA", dataKey: "materia" },
    { title: "GRUPO", dataKey: "grupo" },
    { title: "REP.HOM.", dataKey: "reprobadosHombres" },
    { title: "REP. MUJ.", dataKey: "reprobadosMujeres" },
    { title: "REP. TOT.", dataKey: "totalReprobadosMH" },
    { title: "APR. HOM.", dataKey: "aprobadosHombres" },
    { title: "APR. MUJ.", dataKey: "aprobadosMujeres" },
    { title: "APR. TOT.", dataKey: "totalAprobadosMH" },
    { title: "TOT. HOM.", dataKey: "totalHombre" },
    { title: "TOT. MUJ.", dataKey: "totalMujeres" },
    { title: "TOT.", dataKey: "totalHM" },
    { title: "%REP", dataKey: "reprobacion" },
    { title: "%APR", dataKey: "aprobacion" }];
const columnSuma = [
    { title: "TOTAL", dataKey: "materia" },
    { title: "TOTAL REP.HOM.", dataKey: "reprobadosHombres" },
    { title: "TOTAL REP. MUJ.", dataKey: "reprobadosMujeres" },
    { title: "TOTAL REP.", dataKey: "totalReprobadosMH" },
    { title: "TOTAL APR. HOM.", dataKey: "aprobadosHombres" },
    { title: "TOTAL APR. MUJ.", dataKey: "aprobadosMujeres" },
    { title: "TOTAL APR. TOT.", dataKey: "totalAprobadosMH" },
    { title: "TOTAL HOM.", dataKey: "totalHombre" },
    { title: "TOTAL MUJ.", dataKey: "totalMujeres" },
    { title: "TOTAL H M", dataKey: "totalHM" },
    { title: "%REP", dataKey: "reprobacion" },
    { title: "%APR", dataKey: "aprobacion" }]


export async function porDepartamentoReprobacion(idcarrera,idperiodo) {
    try {
    let LISTA_ALUMNOS =[];
    var doc = new jsPDF('p', 'mm', 'letter')
    doc.setFontSize(14)
    doc.text(45, 5, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS')

    //FETCH datos
    await Axios.get('/api/reporte/consultar/carrera-reprobacion',{
        params:{
            periodo:idperiodo,
            idcarrera:idcarrera
        }
    })
        .then((res)=>{
            LISTA_ALUMNOS = res.data
        })
        .catch((error)=>console.log(error))
if (LISTA_ALUMNOS){
    //Agrupar por doncente
    let hash = {};
    let INFORMACION_DOCENTE = LISTA_ALUMNOS.filter(o => hash[o.iddocente] ? false : hash[o.iddocente] = true);
    let carreraNombre=LISTA_ALUMNOS[0].carreraNombre;
    for (let index=0;index < INFORMACION_DOCENTE.length;index++){
        let filtroAlumno= await LISTA_ALUMNOS.filter(item=> item.iddocente === INFORMACION_DOCENTE[index].iddocente);
        let totalHombresReprobados=0;
        let totalMujeresReprobados=0;
        let totalReprobadosHM=0;
        let totalAprobacionHombres=0;
        let totalAprobacionMujeres=0;
        let totalAprobacionHM=0;
        let totalHombres=0;
        let totalMujeres=0;
        let totalHM=0;
        let totalReprobacion=0;
        let totalAprobacion=0;
        for (let index1=0;index1 < filtroAlumno.length;index1++){
            totalHombresReprobados = totalHombresReprobados + filtroAlumno[index1].reprobadosHombres;
            totalMujeresReprobados = totalMujeresReprobados +filtroAlumno[index1].reprobadosMujeres;
            totalReprobadosHM =totalReprobadosHM + filtroAlumno[index1].totalReprobadosMH;

            totalAprobacionHombres=totalAprobacionHombres +filtroAlumno[index1].aprobadosHombres;
            totalAprobacionMujeres=totalAprobacionMujeres +filtroAlumno[index1].aprobadosMujeres;
            totalAprobacionHM=totalAprobacionHM +filtroAlumno[index1].totalAprobadosMH;

            totalHombres=totalHombres +filtroAlumno[index1].totalHombre;
            totalMujeres=totalMujeres +filtroAlumno[index1].totalMujeres;
            totalHM=totalHM +filtroAlumno[index1].totalHM;
        }

        totalReprobacion = Math.round((totalReprobadosHM*100)/totalHM);
        totalAprobacion = Math.round((totalAprobacionHM*100)/totalHM);
        doc.setFontSize(10)
        doc.text(10,20,`CARRERA: ${carreraNombre.toUpperCase()}`)
        var finalY = doc.lastAutoTable.finalY || 10;
        doc.setFontSize(7)
        doc.text(`DOCENTE: ${INFORMACION_DOCENTE[index].docente.toUpperCase()}`, 15, finalY + 18)
        doc.autoTable(columnMateriasCursando,filtroAlumno,
            {
                margin: { bottom: 20,top:3 },
                styles: { halign:'center',cellPadding: 0.5, fontSize: 7 },

                columnStyles: { 0: { halign: 'left', cellWidth:50 } },
                headStyles:{
                    fillColor:null ,
                    textColor:'black',
                    lineWidth: 0.1
                },
                startY: finalY + 20,

            }
        );
        doc.autoTable(columnSuma,[{
                materia:'',
                reprobadosHombres:totalHombresReprobados,
                reprobadosMujeres:totalMujeresReprobados,
                totalReprobadosMH:totalReprobadosHM,
                aprobadosHombres:totalAprobacionHombres,
                aprobadosMujeres:totalAprobacionMujeres,
                totalAprobadosMH:totalAprobacionHM,
                totalHombre:totalHombres,
                totalMujeres:totalMujeres,
                totalHM:totalHM,
                reprobacion:totalReprobacion,
                aprobacion:totalAprobacion,

            }],
            {
                margin: { bottom: 20,top:3 },
                styles: { halign:'center',cellPadding: 0.5, fontSize: 7 },

                columnStyles: { 0: { halign: 'left', cellWidth:60 } },
                headStyles:{
                    fillColor:null ,
                    textColor:'black',
                    lineWidth: 0.1
                },
            }
        );
    }



    doc.save("Reprobación departamento");

}else{
    alert("La carrera que selecciono, no cuenta con docentes en el periodo seleccionado.")
        }

    }catch (e) {
        console.log(e)
    }
}
