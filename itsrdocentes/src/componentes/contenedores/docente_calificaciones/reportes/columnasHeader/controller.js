import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Itsr from '../../../../img/Logo-Tec.png';
import { dataMateria } from '../../../../../home';
import { getReporteHorarios, getReporteParcial, dataReportHorario, dataPeriodo, dataReporteParciales } from '../../../../servicios/api';
import { columns, columnsAprobacion, columnsReprobacion, Actacolumns, ActacolumnsAprobacion, ActacolumnsReprobacion } from '../columnasHeader/heders'


var newListaParciales = [];
var arrayAprobacion = [];
var listaActa = [];

export const infPdf = async (pamrs) => {// paso 1 PAMRS: PARCIAL O ACTA
    console.log("imprimiendo.... . " + pamrs)
    try {
        const DOCENTE_ACTUAL = dataMateria[0].nameDocente;
        for (let index = 0; index < dataMateria.length; index++) {
            const ID_MATERIA = dataMateria[index].idMateria;
            const PERIODO = dataMateria[index].idnomenclaturaPeriodo;
            const GRUPO = dataMateria[index].idGrupos;
            const Materia = dataMateria[index].nombre;
            const ClaveMateria = dataMateria[index].clave_materia;
            const ClavePersonal = dataMateria[index].clavePersonal;
            const ClavePlan = dataMateria[index].plan;
            const nombreCarrera = dataMateria[index].nombreCorto;
            const claveCarrera = dataMateria[index].clave;





            //periodo materia personal grupo
            await Promise.all([getReporteHorarios(PERIODO, ID_MATERIA, GRUPO), getReporteParcial(ID_MATERIA, GRUPO)])
            await lista(pamrs)
            if (pamrs === 'parcial') {
                await pdfParcial(Materia, DOCENTE_ACTUAL,ClaveMateria,ClavePersonal,ClavePlan, nombreCarrera, claveCarrera)
            } else {
                await pdActaFinal(Materia, DOCENTE_ACTUAL,ClaveMateria, ClavePersonal,ClavePlan, nombreCarrera, claveCarrera)
            }

            //limpiar
            newListaParciales = []
            arrayAprobacion = []
            dataReporteParciales = []
        }

    } catch (error) {
        console.log(error)
    }
}//fin paso 1


const lista = async (pamrs) => {// paso 2

    console.log('data parciales')
    console.log(dataReporteParciales)

    var nm = 1
    for (let index2 = 0; index2 < dataReporteParciales.length; index2++) {// repite segun el numro de alumnos terminados

        let
            tema1 = parseInt(dataReporteParciales[index2].tema1 || 0),
            tema2 = parseInt(dataReporteParciales[index2].tema2 || 0),
            tema3 = parseInt(dataReporteParciales[index2].tema3 || 0),
            tema4 = parseInt(dataReporteParciales[index2].tema4 || 0),
            tema5 = parseInt(dataReporteParciales[index2].tema5 || 0),
            tema6 = parseInt(dataReporteParciales[index2].tema6 || 0),
            tema7 = parseInt(dataReporteParciales[index2].tema7 || 0),
            tema8 = parseInt(dataReporteParciales[index2].tema8 || 0),
            tema9 = parseInt(dataReporteParciales[index2].tema9 || 0),
            tema10 = parseInt(dataReporteParciales[index2].tema10 || 0),
            opcion1 = dataReporteParciales[index2].opcion1,
            opcion2 = dataReporteParciales[index2].opcion2,
            opcion3 = dataReporteParciales[index2].opcion3,
            opcion4 = dataReporteParciales[index2].opcion4,
            opcion5 = dataReporteParciales[index2].opcion5,
            opcion6 = dataReporteParciales[index2].opcion6,
            opcion7 = dataReporteParciales[index2].opcion7,
            opcion8 = dataReporteParciales[index2].opcion8,
            opcion9 = dataReporteParciales[index2].opcion9,
            opcion10 = dataReporteParciales[index2].opcion10;

        var eliminar = [{ n: tema1 }, { n: tema2 }, { n: tema3 }, { n: tema4 }, { n: tema5 }, { n: tema6 }, { n: tema7 }, { n: tema8 }, { n: tema9 }, { n: tema10 }]
        var promediar = eliminar.filter(function (n) {// numero divicion sin 0

            return n.n !== 0;
        });

        let TOTAL = parseInt((tema1 + tema2 + tema3 + tema4 + tema5 + tema6 + tema7 + tema8 + tema9 + tema10) / promediar.length)
        //nueva lista de alumnos con resultado promedio
        newListaParciales[index2] = { // amacen de todos los resultados de unidades por tema general y  el de temas total 
            nm: nm,
            nombreAspirante: dataReporteParciales[index2].nombreAspirante,
            numeroControl: dataReporteParciales[index2].numeroControl,
            tema1: tema1,
            tema2: tema2,
            tema3: tema3,
            tema4: tema4,
            tema5: tema5,
            tema6: tema6,
            tema7: tema7,
            tema8: tema8,
            tema9: tema9,
            tema10: tema10,
            opcion1: opcion1,
            opcion2: opcion2,
            opcion3: opcion3,
            opcion4: opcion4,
            opcion5: opcion5,
            opcion6: opcion6,
            opcion7: opcion7,
            opcion8: opcion8,
            opcion9: opcion9,
            opcion10: opcion10,
            Total: TOTAL
        };
        nm++
    }//fin for

if(pamrs==='acta'){
    var nmx =1;
    for (let nx = 0; nx < newListaParciales.length; nx++) {//forr

        let
            opcion1 = newListaParciales[nx].opcion1,
            opcion2 = newListaParciales[nx].opcion2,
            opcion3 = newListaParciales[nx].opcion3,
            opcion4 = newListaParciales[nx].opcion4,
            opcion5 = newListaParciales[nx].opcion5,
            opcion6 = newListaParciales[nx].opcion6,
            opcion7 = newListaParciales[nx].opcion7,
            opcion8 = newListaParciales[nx].opcion8,
            opcion9 = newListaParciales[nx].opcion9,
            opcion10 = newListaParciales[nx].opcion10;

        var validar = [{ n: opcion1 }, { n: opcion2 }, { n: opcion3 }, { n: opcion4 }, { n: opcion5 }, { n: opcion6 }, { n: opcion7 }, { n: opcion8 }, { n: opcion9 }, { n: opcion10 }]
        var Resul = validar.filter(function (n) {// verifiar opcion
            return n.n !== '1' && n.n !== '';
        });
        console.log('SEGUNDAS OPORTUNIDADES : ' + Resul.length + 'para : ' + newListaParciales[nx].nombreAspirante)
        console.log(Resul)


        if (Resul.length === 0) {
            listaActa[nx] = {
                nm:nmx,
                nombreAspirante: newListaParciales[nx].nombreAspirante,
                numeroControl: newListaParciales[nx].numeroControl,
                opcion: newListaParciales[nx].opcion,
                primera: newListaParciales[nx].Total,
                segunta: '-'
            }
        } else if (Resul.length > 0) {
            listaActa[nx] = {
                nm:nmx,
                nombreAspirante: newListaParciales[nx].nombreAspirante,
                numeroControl: newListaParciales[nx].numeroControl,
                opcion: newListaParciales[nx].opcion,
                primera: '-',
                segunda: newListaParciales[nx].Total
            }
        }
        nmx++;
    }// fin for
}

    



    var calcularTemas = promediar.length;
    // aprobacion y reprobacion
    await aprobacion(calcularTemas) // inicar paso 3
    /*
        console.log('______filtro LISTA ACTA CALIFICACION_______*')
        console.log(listaActa)
    
        console.log('______filtro LISTA NEW_______*')
    
        console.log(newListaParciales)
    
    
        console.log('______filtro aprobacion_______*')
    
        console.log(arrayAprobacion)
    */
}//fin paso 2



const aprobacion = async (calcularTemas) => {//inicio paso 3
    console.log('=><<<<<<<<<<<<<<<<<<<<' + calcularTemas)
    //var etiqueta
    let aprobacionTema1 = 0, aprobacionTema2 = 0, aprobacionTema3 = 0, aprobacionTema4 = 0, aprobacionTema5 = 0, aprobacionTema6 = 0, aprobacionTema7 = 0, aprobacionTema8 = 0, aprobacionTema9 = 0, aprobacionTema10 = 0;
    let reprobacionTema1 = 0, reprobacionTema2 = 0, reprobacionTema3 = 0, reprobacionTema4 = 0, reprobacionTema5 = 0, reprobacionTema6 = 0, reprobacionTema7 = 0, reprobacionTema8 = 0, reprobacionTema9 = 0, reprobacionTema10 = 0;

    let cont = 1;
    for (let index = 0; index <= calcularTemas; index++) {
        console.log('entrendo al for === ' + index)

        var sumaTema = 0;

        console.log(sumaTema)
        //pasar al array
        switch (cont) {
            case 1:
                console.log("1")
                var temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema1;
                    return tem.tema1 !== 0;
                });
                aprobacionTema1 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema1 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break;
            case 2:
                console.log("2")
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema2;
                    return tem.tema2 !== 0;
                });


                aprobacionTema2 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema2 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            case 3:
                console.log("3")
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema3;
                    return tem.tema3 !== 0;
                });

                aprobacionTema3 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema3 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            case 4:
                console.log("4")
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema4;
                    return tem.tema4 !== 0;
                });


                aprobacionTema4 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema4 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            case 5:
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema5;
                    return tem.tema5 !== 0;
                });

                aprobacionTema5 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema5 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            case 6:
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema6;
                    return tem.tema6 !== 0;
                });
                aprobacionTema6 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema6 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            case 7:
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema7;
                    return tem.tema7 !== 0;
                });
                aprobacionTema7 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema7 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            case 8:
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema8;
                    return tem.tema8 !== 0;
                });
                aprobacionTema8 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema8 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            case 9:
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema9;
                    return tem.tema9 !== 0;
                });
                aprobacionTema9 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema9 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            case 10:
                temaTotal = newListaParciales.filter(function (tem) {
                    sumaTema = sumaTema + tem.tema10;
                    return tem.tema10 !== 0;
                });
                aprobacionTema10 = Math.round(sumaTema / temaTotal.length)
                reprobacionTema10 = Math.round(((sumaTema) / temaTotal.length) - 100)

                break
            default:
                break;

        }
        cont++
    }
    //calcular aprobacion
    var aprobacionTotal=0,reprobacionTotal=0, sumaTemas=0;
     var temaTotals = await newListaParciales.filter(function (tem) {
        sumaTemas = sumaTemas + tem.Total;
        return tem.Total !== 0;
    });

    aprobacionTotal = Math.round(sumaTemas / temaTotals.length)
    reprobacionTotal = Math.round(((sumaTemas) / temaTotals.length) - 100)

    arrayAprobacion[0] = { // lista con la aprobacion y reprobacion
        aprobacionTema1: aprobacionTema1,
        aprobacionTema2: aprobacionTema2,
        aprobacionTema3: aprobacionTema3,
        aprobacionTema4: aprobacionTema4,
        aprobacionTema5: aprobacionTema5,
        aprobacionTema6: aprobacionTema6,
        aprobacionTema7: aprobacionTema7,
        aprobacionTema8: aprobacionTema8,
        aprobacionTema9: aprobacionTema9,
        aprobacionTema10: aprobacionTema10,
        aprobacionTotal:aprobacionTotal,
        etiquetaAprobacion:'%Aprobacion:',

        reprobacionTema1: Math.abs(reprobacionTema1) === 0 ? 100 : Math.abs(reprobacionTema1),
        reprobacionTema2: Math.abs(reprobacionTema2) === 0 ? 100 : Math.abs(reprobacionTema2),
        reprobacionTema3: Math.abs(reprobacionTema3) === 0 ? 100 : Math.abs(reprobacionTema3),
        reprobacionTema4: Math.abs(reprobacionTema4) === 0 ? 100 : Math.abs(reprobacionTema4),
        reprobacionTema5: Math.abs(reprobacionTema5) === 0 ? 100 : Math.abs(reprobacionTema5),
        reprobacionTema6: Math.abs(reprobacionTema6) === 0 ? 100 : Math.abs(reprobacionTema6),
        reprobacionTema7: Math.abs(reprobacionTema7) === 0 ? 100 : Math.abs(reprobacionTema7),
        reprobacionTema8: Math.abs(reprobacionTema8) === 0 ? 100 : Math.abs(reprobacionTema8),
        reprobacionTema9: Math.abs(reprobacionTema9) === 0 ? 100 : Math.abs(reprobacionTema9),
        reprobacionTema10: Math.abs(reprobacionTema10) === 0 ? 100 : Math.abs(reprobacionTema10),
        reprobacionTotal: Math.abs(reprobacionTotal) === 0 ? 100 : Math.abs(reprobacionTotal),
        etiquetaReprobacion:'%Reprobacion:',


    }
    // arrayAprobacionOrdenado=[{aprobacionTema1:arrayAprobacion[0]}]
    console.log('fin de for aprobacion5')
    console.log(arrayAprobacion)
    console.log('VER LISTA DE APROVACION')
    console.log(newListaParciales)
}//fin paso 3


const pdfParcial = (nomMateria, docente_actual,ClaveMateria,ClavePersonal, ClavePlan,nombreCarrera, claveCarrera) => {
    const Horas_clases = dataReportHorario[0].semanas;
    const Grupo = dataReportHorario[0].grupo;
    const Semestre = dataReportHorario[0].semestre;

    var img = new Image();
    img.src = Itsr;

    const pdf = new jsPDF('p', 'pt', 'letter')
    //body


    pdf.autoTable(columns, newListaParciales,
        {
            margin: { top: 78 },
            styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
            theme: 'grid',
            columnStyles: { 2: { halign: 'left', fillColor: [0, 255, 0] } },

        }
    );

    let apro = pdf.autoTable.previous;// aprobacion ··3#############
    pdf.autoTable(columnsAprobacion, arrayAprobacion,
        {
            margin: { top: 0,left:310 },
            styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
            theme: 'plain',
            tableWidth:230, 
            startY: pdf.autoTable.previous.finalY+7
        },
      //  { startY: apro.finalY + 0 }
    );

    let repro = pdf.autoTable.previous;// aprobacion ··3#############
    pdf.autoTable(columnsReprobacion, arrayAprobacion,
        {
            margin: { top: 0,left:310 },
            styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
            theme: 'plain',
            tableWidth:230,
            startY: pdf.autoTable.previous.finalY+2
        },
    );



    //piede paginas
    const pageCount = pdf.internal.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
        pdf.setPage(i);


        pdf.setFontSize(14)//encabezado
        pdf.text(130, 15, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS')
        pdf.line(100, 17, 500, 17) // horizontal line
        pdf.setFontSize(8)
        pdf.text(262, 26, "PRELISTA CON PARCIALES");
        pdf.roundedRect(102, 45, 400, 12, 3, 3)
        pdf.setFontSize(8)
        pdf.text(100, 40, `MATERIA: ${ClaveMateria} ${nomMateria}`);
        pdf.setFontSize(8)
        pdf.text(500, 31, `PERIODO: ${dataPeriodo[0].rango}`);
        pdf.setFontSize(8)
        pdf.text(500, 40, `FECHA: ${moment().format('L')}`);
        pdf.setFontSize(7)
        pdf.text(122, 54, Horas_clases);
        pdf.setFontSize(8)
        pdf.text(500, 66, `GRUPO: ${Semestre} ${Grupo}`);
        pdf.setFontSize(8)
        pdf.text(100, 66, `DOCENTE: ${ClavePersonal} ${docente_actual}`);
        pdf.setFontSize(8)
        pdf.text(100, 74,`CARRERA: ${claveCarrera}  ${nombreCarrera}  ${ClavePlan}`  );
        pdf.addImage(img, 'PNG', 13, 10, 63, 63)


        //pdf.setFontSize(7)//pie de pagina
        //pdf.text(20, 760, "C (Curso, R:Repetición, E:Especial)");
        //pdf.setLineWidth(1.6)
        pdf.setFillColor(255, 255, 255)
        pdf.roundedRect(10, 738, 270, 50, 3, 3, 'FD')
        pdf.setFontSize(7)//pie de pagina
        pdf.text(20, 750, "OBSERVACIONES:");
        pdf.setFontSize(7)//pie de pagina
        pdf.text(283, 785, "C (Curso, R:Repetición, E:Especial)");


        pdf.line(390, 760, 500, 760)
        pdf.setFontSize(7)
        pdf.text(413, 767, "FIRMA DOCENTE");
        pdf.text(550, 785, 'Pagina' + String(i) + ' de ' + String(pageCount), null, null, null, null, "right");
    }
    pdf.save(`PARCIALES ${nomMateria}.pdf`);

}

//pdf acta final
const pdActaFinal = (nomMateria, docente_actual, ClaveMateria,ClavePersonal, ClavePlan,nombreCarrera, claveCarrera) => {
    const Horas_clases = dataReportHorario[0].semanas;
    const Grupo = dataReportHorario[0].grupo;
    const Semestre = dataReportHorario[0].semestre;

    var img = new Image();
    img.src = Itsr;

    const pdf = new jsPDF('p', 'pt', 'letter')
    //body


    pdf.autoTable(Actacolumns, listaActa
        ,
        {
            margin: { top: 78 },
            styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
            theme: 'grid',
            columnStyles: { 2: { halign: 'left', fillColor: [0, 255, 0] } },

        }
    );

    let apro = pdf.autoTable.previous;// aprobacion ··3#############
    pdf.autoTable(ActacolumnsAprobacion, arrayAprobacion,
        {
            margin: { top: 0, left:395 },
            styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
            theme: 'plain',
            tableWidth:130, 
            startY: pdf.autoTable.previous.finalY
        },
        //{ startY:false }
    );

    let repro = pdf.autoTable.previous;// reprobacion ··3#############
    pdf.autoTable(ActacolumnsReprobacion, arrayAprobacion,
        {
            margin: { top: 0, left:395 },
            styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
            theme: 'plain',
            tableWidth:130, 
            startY: pdf.autoTable.previous.finalY
        },
       
    );



    //piede paginas
    const pageCount = pdf.internal.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
        pdf.setPage(i);


        pdf.setFontSize(14)//encabezado
        pdf.text(130, 15, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS')
        pdf.line(100, 17, 500, 17) // horizontal line
        pdf.setFontSize(8)
        pdf.text(262, 26, "ACTA DE CALIFICACION");
        pdf.roundedRect(102, 45, 400, 12, 3, 3)
        pdf.setFontSize(8)
        pdf.text(100, 40, `MATERIA: ${ClaveMateria}  ${nomMateria}  ${ClavePlan}`);
        pdf.setFontSize(8)
        pdf.text(500, 31, `PERIODO: ${dataPeriodo[0].rango}`);
        pdf.setFontSize(8)
        pdf.text(500, 40, `FECHA: ${moment().format('L')}`);
        pdf.setFontSize(7)
        pdf.text(122, 54, Horas_clases);
        pdf.setFontSize(8)
        pdf.text(500, 66, `GRUPO: ${Semestre} ${Grupo}`);
        pdf.setFontSize(8)
        pdf.text(100, 66, `DOCENTE: ${ClavePersonal}  ${docente_actual}`);
        pdf.setFontSize(8)
        pdf.text(100, 74,`CARRERA: ${claveCarrera}  ${nombreCarrera}  ${ClavePlan}`  );
        pdf.addImage(img, 'PNG', 13, 10, 63, 63)

        pdf.setFont('helvetica')
        pdf.setFontType('bold')
        pdf.setFontSize(7)//pie de pagina
        pdf.text(20, 752, "1RA Evaluación de 1ra Oportunidad, 2DA Evaluación de 2da Oportunidad");

        pdf.setFontSize(7)//pie de pagina
        pdf.text(20, 760, "C (Curso, R:Repetición, E:Especial)");
        pdf.setLineWidth(1.6)
        pdf.line(390, 760, 500, 760)
        pdf.setFontSize(7)
        pdf.text(413, 767, "FIRMA DOCENTE");
        pdf.text(20, 770, 'Pagina' + String(i) + ' de ' + String(pageCount), null, null, null, null, "right");
    }
    pdf.save(`Acta final ${nomMateria}.pdf`);

}