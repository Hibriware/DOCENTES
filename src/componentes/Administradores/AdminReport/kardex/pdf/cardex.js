import {format} from 'date-fns';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import {GET_KARDEX} from "../../constants/end-points";

let jsPDF = null;

const columns = [
    {title: "NO", dataKey: "nm"},
    {title: "CLAVE", dataKey: "claveMateria"},
    {title: "NOMBRE MATERIAS CURSADAS", dataKey: "materia"},
    {title: "CR", dataKey: "creditos"},
    {title: "CAL", dataKey: "promedio"},
    {title: "TC", dataKey: "opcion"},
    {title: "POR PRIMERA", dataKey: "periodoCurso"},
    {title: "X SEG", dataKey: "xsegunda"},
    {title: "ESPECIAL", dataKey: "xespecial"}];
const columnsx = [
    {title: "NO", dataKey: "nm"},
    {title: "CLAVE", dataKey: "claveMateria"},
    {title: "NOMBRE MATERIAS POR CURSAR", dataKey: "materia"},
    {title: "CR", dataKey: "creditos"},
    {title: "CAL", dataKey: "promedio"},
    {title: "TC", dataKey: "opcion"},
    {title: "POR PRIMERA", dataKey: "periodoCurso"},
    {title: "X SEG", dataKey: "21"},
    {title: "ESPECIAL", dataKey: "32"}];

const columnMateriasCursando = [
    {title: "NO", dataKey: "nm"},
    {title: "CLAVE", dataKey: "claveMateria"},
    {title: "NOMBRE MATERIAS CURSANDO", dataKey: "materia"},
    {title: "CR", dataKey: "creditos"},
    {title: "CAL", dataKey: "promedio"},
    {title: "TC", dataKey: "tc"},
    {title: "POR PRIMERA", dataKey: "periodoCurso"},
    {title: "X SEG", dataKey: "xsegunda"},
    {title: "ESPECIAL", dataKey: "xespecial"}]


if (typeof window !== "undefined") {
    import("jspdf").then((module) => {
        jsPDF = module.default;
    });
}

//periodo,folio,idCarrera,nombreAlumno,nombreCarrera,numeroControl,semestre
export async function descargarCardex(periodo, numeroControls) {
    try {
        if (jsPDF) {
            var doc = new jsPDF('p', 'mm', 'letter')
            doc.page = 1;

            const getCardex = await axios.get(GET_KARDEX,
                {
                    params: {
                        numeroControl: numeroControls,
                        periodo: periodo
                    }
                })
                .then((res) => res.data)
                .catch(error => console.log(error))

            if (getCardex?.cursadas || getCardex?.materiasApro) {
                const nombreAlumno = getCardex.infoAlumno?.nombreApirante;
                const nombreCarrera = getCardex.infoAlumno?.nombreCarrera;
                const semestre = getCardex.infoAlumno?.semestreActual;

                const creditosTotales = getCardex?.creditosTotales;
                const numeroMateriasCursadas = getCardex?.cursadas.length;
                const numeroMateriasAprobadas = getCardex?.materiasApro.length;
                const PCTJ = Math.round(getCardex?.creditosPorcentaje | 0)

                let materiasCursadasNumerada = getCardex?.cursadas;
                let materiasCursandoNumeradas = getCardex?.cursando;
                let materiasPorCursarNumeradas = getCardex?.porCursar;

                let aux = 1;
                for (const columnsxKey in materiasCursadasNumerada) {
                    materiasCursadasNumerada[columnsxKey].nm = aux;
                    aux++;
                }

                let aux2 = 1;
                for (const columnsxKey in materiasCursandoNumeradas) {
                    materiasCursandoNumeradas[columnsxKey].nm = aux2;
                    aux2++;
                }

                let aux3 = 1;
                for (const columnsxKey in materiasPorCursarNumeradas) {
                    materiasPorCursarNumeradas[columnsxKey].nm = aux3;
                    aux3++;
                }

                doc.autoTable(columns, materiasCursadasNumerada,
                    {
                        margin: {bottom: 50, top: 35},
                        styles: {halign: 'center', cellPadding: 0.5, fontSize: 7},

                        columnStyles: {2: {halign: 'left', cellWidth: 85}},
                        headStyles: {
                            fillColor: null,
                            textColor: 'black',
                            lineWidth: 0.1
                        }

                    }
                );

                doc.autoTable(columnMateriasCursando, materiasCursandoNumeradas,
                    {
                        margin: {bottom: 50, top: 35},
                        border: {borderRadius: 6},

                        styles: {halign: 'center', cellPadding: 0.5, fontSize: 7},
                        //theme: 'grid',
                        columnStyles: {2: {halign: 'left', cellWidth: 85}},
                        headStyles: {
                            fillColor: null,
                            textColor: 'black',
                            lineWidth: 0.1
                        }

                    }
                );
                doc.autoTable(columnsx, materiasPorCursarNumeradas,
                    {
                        margin: {bottom: 50, top: 35},
                        border: {borderRadius: 6},

                        styles: {halign: 'center', cellPadding: 0.5, fontSize: 7},

                        columnStyles: {2: {halign: 'left', cellWidth: 85}},
                        headStyles: {
                            fillColor: null,
                            textColor: 'black',
                            lineWidth: 0.1
                        }

                    }
                );


//pie de pagina
                const pageCount = doc.internal.getNumberOfPages();
// For each page, print the page number and the total pages
                for (var i = 1; i <= pageCount; i++) {
                    // Go to page i
                    doc.setPage(i);
                    doc.setFontSize(5)
                    doc.text(180, 25, 'KARDEX DEL ALUMNO')
                    doc.setFontSize(5)
                    doc.text(10, 20, `NOMBRE: ${numeroControls} ${nombreAlumno}`)
                    doc.setFontSize(5)
                    doc.text(10, 22, `CARRERA: ${nombreCarrera.toUpperCase()}`)
                    doc.setFontSize(5)
                    doc.text(10, 25, `PLAN: ${getCardex?.planCarrera}`)
                    doc.setFontSize(5)
                    doc.text(10, 27, 'ESPEC:')
                    doc.setFontSize(5)
                    doc.text(10, 29, `INGRESO: ${getCardex?.rangoPeriodo}`)
                    doc.setFontSize(5)
                    doc.text(10, 30.7, 'TERMINO: ')
                    doc.setFontSize(5)
                    doc.text(10, 34, 'MATERIAS CURSADAS')

                    doc.setFontSize(5)
                    doc.text(50, 30.7, `MAT.TOT: ${getCardex?.materiasTotales}`)
                    doc.setFontSize(5)
                    doc.text(50, 29, `MAT.CUR: ${numeroMateriasCursadas}`)
                    doc.setFontSize(5)
                    doc.text(50, 25, `MAT.APR: ${numeroMateriasAprobadas}`)
                    doc.setFontSize(5)
                    doc.text(50, 27, 'MAT.APR.AC: ')

                    doc.setFontSize(5)
                    doc.text(70, 30.7, 'SIT: 1')
                    doc.setFontSize(5)
                    doc.text(70, 29, `CRED.CUR: ${getCardex?.creitosCursando}`)
                    doc.setFontSize(5)
                    doc.text(70, 25, `CRE.TOT: ${creditosTotales}`)
                    doc.setFontSize(5)
                    doc.text(70, 27, `CRED.ACU: ${getCardex?.creditosAcumulados}`)


                    doc.setFontSize(5)
                    doc.text(90, 29, `NPRDO: ${semestre}`)
                    doc.setFontSize(5)
                    doc.text(90, 25, 'NP.CONV: 0')
                    doc.setFontSize(5)
                    doc.text(90, 27, `PCTJE: ${PCTJ}`)

                    doc.setFontSize(5)
                    doc.text(110, 29, `SIN REPROBA: ${getCardex?.promedioSinReprobacion}`)
                    doc.setFontSize(5)
                    doc.text(110, 27, `CON REPROB: ${getCardex?.promedioConReprobacion}`)
                    doc.setFontSize(5)
                    doc.text(110, 25, 'PROMEDIO:')

                    doc.setFontSize(5)
                    doc.text(160, 25, `FECHA: ${format(new Date(), 'dd/MM/yyyy')}`)


                    //PIE DE DEL CARDEX
                    doc.setFontSize(6)
                    doc.text(10, 240, 'CR: CRÉDITOS CAL: CALIFICACIÓN')
                    doc.text(10, 242, 'TC: TIPO DE CALIFICACIÓN 1 ORDINARIO 2 REGULARIZACIÓN 3 EXTRAORDINARIOS')
                    doc.text(14, 244.5, '4 ORDINARIO DE REPITE 5 REGULARIZACIÓN EN REPITE 6 EXAMEN ESPECIAL')
                    doc.text(14, 246.5, '7 EX.ESPECIAL POR 2A 91 CONVALIDACIÓN 92 REVALIDACIÓN 93 EQUIVALENCIA')
                    doc.text(10, 248.5, 'AC: CALIFICACIÓN CON VALOR AC SIN VALOR NUMÉRICO.')

                    doc.text(100, 240, 'MAT.TOT: MATERIAS TOTALES.')
                    doc.text(100, 242, 'MAT.CUR: MATERIAS CURSADAS.')
                    doc.text(100, 244.5, 'MAT.APR: MATERIAS APROBADAS.')
                    doc.text(100, 246.5, 'MAT.APR.AC: MATERIAS APROBADAS COMO AC.')
                    doc.text(100, 248.5, 'CRE.TOT: CRÉDITOS TOTALES.')


                    doc.text(155, 240, 'CRED.ACU: CREDITOS ACUMULADOS.')
                    doc.text(155, 242, 'CRED.CUR: CREDITOS CURSANDO.')
                    doc.text(155, 244.5, 'PCTJE: PORCENTAJE DE CREDITOS.')
                    doc.text(155, 246.5, 'NP.CONV:PERIODOS CONVALIDADOS.')
                    doc.text(155, 248.5, 'NPRDO: NUMERO DE PERIODO ACTUAL.')


                    doc.setLineWidth(0)
                    doc.line(5, 259, 60, 259)
                    doc.setFontSize(6)
                    doc.text(12, 262, 'ING. GELSI OLIVA VERA LEZAMA')
                    doc.text(12, 264, 'JEFE DEL DEPTO. DE SERVICIOS ESCOLARES.')

                    doc.text(120, 262, 'LAS CALIFICACIONES QUE AMPARAN EL PRESENTE DOCUMENTO, ')
                    doc.text(120, 264, 'SERÁN VÁLIDAS, PREVIO COTEJO DE LAS ACTAS CORRESPONDIENTES.')


                    doc.setFontSize(12)
                    doc.text('Page ' + String(i) + ' of ' + String(pageCount), null, null, null, null, "right");
                }

                doc.save('KARDEX')
            }


        }
    } catch (e) {
        console.log(e)
    }
}

