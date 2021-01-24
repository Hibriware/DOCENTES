import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import sweetAlert from 'sweetalert';
import {img} from '../../../boletasCalificacion/pdf/img';
import {
	getReporteHorariosAdmin,
	getReporteParcialAdmin,
	dataReportHorario,
	dataReporteParciales,
	getTemasReportesAdmin
} from '../../../../servicios/api';
import {
	columns,
	columnsAprobacion,
	columnsReprobacion,
	Actacolumns,
	ActacolumnsAprobacion,
	ActacolumnsReprobacion
} from './heders';


var newListaParciales = [];
var arrayAprobacion = [];
var listaActa = [];
var LISTA_DE_TEMAS_POR_MATERIAS = [];

export const infPdf = async (pamrs,idMateriaD ,idPeriodo, idPersonal,infoTeacher) => {

	const[infoTeachers]=infoTeacher;

	// paso 1 PAMRS: PARCIAL O ACTA
	try {
		const DOCENTE_ACTUAL = idPersonal.label;
			const ID_MATERIA = idMateriaD.idmaterias;
			const PERIODO = idPeriodo.idnomenclaturaPeriodo;
			const GRUPO = idMateriaD.asignacionGrupo_idgrupo;
			const Materia = idMateriaD.nomcorto;
			const ClaveMateria = idMateriaD.clave;
			const ClavePersonal = infoTeachers.clavePersonal;
			const ClavePlan = "";
			const nombreCarrera = idMateriaD.carrera;
			const claveCarrera = "";
			const materiaDocenteId = idMateriaD.materiaDocenteId;
			const idDocente = idPersonal.value;

			LISTA_DE_TEMAS_POR_MATERIAS = await getTemasReportesAdmin(ID_MATERIA,materiaDocenteId,PERIODO,idDocente);
			if (LISTA_DE_TEMAS_POR_MATERIAS.length) {
				//periodo materia personal grupo
				await Promise.all([
					getReporteHorariosAdmin(PERIODO, ID_MATERIA, GRUPO,materiaDocenteId,idDocente),
					getReporteParcialAdmin(ID_MATERIA, GRUPO,PERIODO,idDocente,materiaDocenteId)
				]);
				await lista(pamrs);
				if (pamrs === 'parcial') {
					await pdfParcial(
						Materia,
						DOCENTE_ACTUAL,
						ClaveMateria,
						ClavePersonal,
						ClavePlan,
						nombreCarrera,
						claveCarrera
						,idPeriodo
					);
				} else {
					await pdActaFinal(
						Materia,
						DOCENTE_ACTUAL,
						ClaveMateria,
						ClavePersonal,
						ClavePlan,
						nombreCarrera,
						claveCarrera,
						idPeriodo
					);
				}

				//limpiar
				newListaParciales = [];
				arrayAprobacion = [];
				//dataReporteParciales=[];
				//dataReportHorario=[];
				listaActa=[];

				//dataReporteParciales = []
			} else {
				sweetAlert('No se encontraron TEMAS finalizados');
			}
	} catch (error) {
		//sweetAlert('No se encontraron TEMAS finalizados');
		console.log(error);
	}
}; //fin paso 1

const lista = async (pamrs) => {
	// paso 2

	var nm = 1;
	for (let index2 = 0; index2 < dataReporteParciales.length; index2++) {
		// repite segun el numro de alumnos terminados

		const getTemas1 = parseInt(dataReporteParciales[index2].tema1 || 0);
		const getTemas2 = parseInt(dataReporteParciales[index2].tema2 || 0);
		const getTemas3 = parseInt(dataReporteParciales[index2].tema3 || 0);
		const getTemas4 = parseInt(dataReporteParciales[index2].tema4 || 0);
		const getTemas5 = parseInt(dataReporteParciales[index2].tema5 || 0);
		const getTemas6 = parseInt(dataReporteParciales[index2].tema6 || 0);
		const getTemas7 = parseInt(dataReporteParciales[index2].tema7 || 0);
		const getTemas8 = parseInt(dataReporteParciales[index2].tema8 || 0);
		const getTemas9 = parseInt(dataReporteParciales[index2].tema9 || 0);
		const getTemas10 = parseInt(dataReporteParciales[index2].tema10 || 0);


		let tema1 =getTemas1 >= 70 ? getTemas1:0,
			tema2 = getTemas2 >= 70 ? getTemas2:0,
			tema3 = getTemas3 >= 70 ? getTemas3:0,
			tema4 = getTemas4 >= 70 ? getTemas4:0,
			tema5 = getTemas5 >= 70 ? getTemas5:0,
			tema6 = getTemas6 >= 70 ? getTemas6:0,
			tema7 = getTemas7 >= 70 ? getTemas7:0,
			tema8 = getTemas8 >= 70 ? getTemas8:0,
			tema9 = getTemas9 >= 70 ? getTemas9:0,
			tema10 = getTemas10 >= 70 ? getTemas10:0,
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

		var eliminar = [
			{ n: tema1 },
			{ n: tema2 },
			{ n: tema3 },
			{ n: tema4 },
			{ n: tema5 },
			{ n: tema6 },
			{ n: tema7 },
			{ n: tema8 },
			{ n: tema9 },
			{ n: tema10 }
		];
		var promediar = eliminar.filter(function(n) {
			// numero divicion sin 0
			return n.n !== 0;
		});

		let TOTAL = parseFloat(
			(tema1 + tema2 + tema3 + tema4 + tema5 + tema6 + tema7 + tema8 + tema9 + tema10) /
				LISTA_DE_TEMAS_POR_MATERIAS.length || 0
		);

		//nueva lista de alumnos con resultado promedio
		newListaParciales[index2] = {
			// amacen de todos los resultados de unidades por tema general y  el de temas total
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
			Total: TOTAL >= 70 ? Math.round(TOTAL):'NA'
		};
		nm++;
	} //fin

	if (pamrs === 'acta') {
		//SOLO ACTA DE CALIFICACION FINAL
		var nmx = 1;
		for (let nx = 0; nx < newListaParciales.length; nx++) {
			//forr

			let opcion1 = newListaParciales[nx].opcion1,
				opcion2 = newListaParciales[nx].opcion2,
				opcion3 = newListaParciales[nx].opcion3,
				opcion4 = newListaParciales[nx].opcion4,
				opcion5 = newListaParciales[nx].opcion5,
				opcion6 = newListaParciales[nx].opcion6,
				opcion7 = newListaParciales[nx].opcion7,
				opcion8 = newListaParciales[nx].opcion8,
				opcion9 = newListaParciales[nx].opcion9,
				opcion10 = newListaParciales[nx].opcion10;

			var validar = [
				{ n: opcion1 },
				{ n: opcion2 },
				{ n: opcion3 },
				{ n: opcion4 },
				{ n: opcion5 },
				{ n: opcion6 },
				{ n: opcion7 },
				{ n: opcion8 },
				{ n: opcion9 },
				{ n: opcion10 }
			];
			var Resul = validar.filter(function(n) {
				// verifiar opcion
				return n.n !== '1' && n.n !== '';
			});
			//console.log('SEGUNDAS OPORTUNIDADES : ' + Resul.length + 'para : ' + newListaParciales[nx].nombreAspirante);

			if (Resul.length === 0) {
				listaActa[nx] = {
					nm: nmx,
					nombreAspirante: newListaParciales[nx].nombreAspirante,
					numeroControl: newListaParciales[nx].numeroControl,
					opcion: newListaParciales[nx].opcion,
					primera: newListaParciales[nx].Total,
					segunta: '-'
				};
			} else if (Resul.length > 0) {
				listaActa[nx] = {
					nm: nmx,
					nombreAspirante: newListaParciales[nx].nombreAspirante,
					numeroControl: newListaParciales[nx].numeroControl,
					opcion: newListaParciales[nx].opcion,
					primera: '-',
					segunda: newListaParciales[nx].Total
				};
			}
			nmx++;
		} // fin for
	} //FIN ACTA DE CALIFICACION FINAL

	//var calcularTemas = promediar.length;
	// aprobacion y reprobacion
	await aprobacion(); // inicar paso 3
}; //fin paso 2

const aprobacion = async (calcularTemas) => {
	//inicio paso 3

	//var etiqueta
	let aprobacionTema1 = 0,
		aprobacionTema2 = 0,
		aprobacionTema3 = 0,
		aprobacionTema4 = 0,
		aprobacionTema5 = 0,
		aprobacionTema6 = 0,
		aprobacionTema7 = 0,
		aprobacionTema8 = 0,
		aprobacionTema9 = 0,
		aprobacionTema10 = 0;
	let reprobacionTema1 = 0,
		reprobacionTema2 = 0,
		reprobacionTema3 = 0,
		reprobacionTema4 = 0,
		reprobacionTema5 = 0,
		reprobacionTema6 = 0,
		reprobacionTema7 = 0,
		reprobacionTema8 = 0,
		reprobacionTema9 = 0,
		reprobacionTema10 = 0;

	var cont = 1;
	for (let index = 0; index < 10; index++) {
		//var sumaTema = 0;

		//pasar al array
		switch (cont) {
			case 1:
				var temaTotal = newListaParciales.filter(function(tem) {
//					sumaTema = sumaTema + tem.tema1;
					return tem.tema1 >= 70;
				});
				//aprobacionTema1 = Math.round((temaTotal.length / dataReporteParciales.length)*100)
				aprobacionTema1 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema1 = 100 - aprobacionTema1;

				// reprobacionTema1 = Math.round(((sumaTema) / temaTotal.length) - 100)
				break;
			case 2:
				temaTotal = newListaParciales.filter(function(tem) {
					//sumaTema = sumaTema + tem.tema2;
					return tem.tema2 >= 70;
				});
				//aprobacionTema2 = Math.round((temaTotal.length / dataReporteParciales.length)*100)
				aprobacionTema2 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema2 = 100 - aprobacionTema2;

				break;
			case 3:
				temaTotal = newListaParciales.filter(function(tem) {
					//sumaTema = sumaTema + tem.tema3;
					return tem.tema3 >= 70;
				});

				aprobacionTema3 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema3 = 100 - aprobacionTema3;

				break;
			case 4:
				temaTotal = newListaParciales.filter(function(tem) {
					//sumaTema = sumaTema + tem.tema4;
					return tem.tema4 >= 70;
				});
				//aprobacionTema4 = Math.round((temaTotal.length / dataReporteParciales.length)*100)
				aprobacionTema4 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema4 = 100 - aprobacionTema4;
				break;
			case 5:
				temaTotal = newListaParciales.filter(function(tem) {
					//sumaTema = sumaTema + tem.tema5;
					return tem.tema5 >= 70;
				});

				aprobacionTema5 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema5 = 100 - aprobacionTema5;
				break;
			case 6:
				temaTotal = newListaParciales.filter(function(tem) {
					//sumaTema = sumaTema + tem.tema6;
					return tem.tema6 >= 70;
				});
				aprobacionTema6 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema6 = 100 - aprobacionTema6;

				break;
			case 7:
				temaTotal = newListaParciales.filter(function(tem) {
				//	sumaTema = sumaTema + tem.tema7;
					return tem.tema7 >= 70;
				});
				aprobacionTema7 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema7 = 100 - aprobacionTema7;

				break;
			case 8:
				temaTotal = newListaParciales.filter(function(tem) {
					//sumaTema = sumaTema + tem.tema8;
					return tem.tema8 >= 70;
				});
				aprobacionTema8 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema8 = 100 - aprobacionTema8;

				break;
			case 9:
				temaTotal = newListaParciales.filter(function(tem) {
					//sumaTema = sumaTema + tem.tema9;
					return tem.tema9 > 70;
				});
				aprobacionTema9 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema9 = 100 - aprobacionTema9;
				break;
			case 10:
				temaTotal = newListaParciales.filter(function(tem) {
					//sumaTema = sumaTema + tem.tema10;
					return tem.tema10 > 70;
				});
				aprobacionTema10 = Math.round(100 / dataReporteParciales.length * temaTotal.length);
				reprobacionTema10 = 100 - aprobacionTema10;
				break;
			default:
				break;
		}
		cont++;
	}
	//calcular aprobacion LISTA_DE_TEMAS_POR_MATERIAS.length
	var aprobacionTotal = 0,
		reprobacionTotal = 0;
		//sumaTemas = 0;
	var temaTotals = await newListaParciales.filter(function(tem) {
		//sumaTemas = sumaTemas + tem.Total;
		return tem.Total >= 70;
	});

	aprobacionTotal = Math.round(100 / dataReporteParciales.length * temaTotals.length);
	reprobacionTotal = 100 - aprobacionTotal;

	arrayAprobacion[0] = {
		// lista con la aprobacion y reprobacion
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
		aprobacionTotal: aprobacionTotal,
		etiquetaAprobacion: '%Aprobación:',

		reprobacionTema1:  Math.abs(reprobacionTema1),
		reprobacionTema2:  Math.abs(reprobacionTema2),
		reprobacionTema3:  Math.abs(reprobacionTema3),
		reprobacionTema4:  Math.abs(reprobacionTema4),
		reprobacionTema5:  Math.abs(reprobacionTema5),
		reprobacionTema6:  Math.abs(reprobacionTema6),
		reprobacionTema7:  Math.abs(reprobacionTema7),
		reprobacionTema8:  Math.abs(reprobacionTema8),
		reprobacionTema9:  Math.abs(reprobacionTema9),
		reprobacionTema10: Math.abs(reprobacionTema10),
		reprobacionTotal:  Math.abs(reprobacionTotal),
		etiquetaReprobacion: '%Reprobación:'
	};
	// arrayAprobacionOrdenado=[{aprobacionTema1:arrayAprobacion[0]}]
}; //fin paso 3

const pdfParcial  = async (
	nomMateria,
	docente_actual,
	ClaveMateria,
	ClavePersonal,
	ClavePlan,
	nombreCarrera,
	claveCarrera,
	idPeriodo
) => {
	const Horas_clases = dataReportHorario[0].semanas;
	const Grupo = dataReportHorario[0].grupo;
	const Semestre = dataReportHorario[0].semestre;
//console.log(dataReportHorario,"dataReportHorario")


	const pdf = new jsPDF('p', 'pt', 'letter');
	//body

	pdf.autoTable(columns, newListaParciales, {
		margin: { top: 78 },
		styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
		theme: 'grid',
		columnStyles: { 2: { halign: 'left' } }
	});

	let apro = pdf.autoTable.previous; // aprobacion ··3#############
	pdf.autoTable(
		columnsAprobacion,
		arrayAprobacion,
		{
			margin: { top: 0, left: 310 },
			styles: { halign: 'center', cellPadding: 0.5, fontSize: 7,columnWidth:15 },
			theme: 'plain',
			tableWidth: 230,
			columnStyles: {0: { columnWidth: 70 ,halign: 'center'}},//, 1: { columnWidth: 15, halign: 'center' },2: { columnWidth: 15,halign: 'center' },3: { columnWidth: 15 },4: { columnWidth: 15 },5: { columnWidth: 15 },
			//6: { columnWidth: 15 },7: { columnWidth: 15 },8: { columnWidth: 15 },9: { columnWidth: 15 },10: { columnWidth: 15 },10: { columnWidth: 15 }  },
			startY: pdf.autoTable.previous.finalY + 7
		
		}
		//  { startY: apro.finalY + 0 }
	);

	let repro = pdf.autoTable.previous; // aprobacion ··3#############
	pdf.autoTable(columnsReprobacion, arrayAprobacion, {
		margin: { top: 0, left: 310 },
		styles: { halign: 'center', cellPadding: 0.5, fontSize: 7,columnWidth:15 },
		theme: 'plain',
		tableWidth: 230,
		columnStyles: {0: { columnWidth: 70 ,halign: 'center'}},
		//columnStyles: { 0: { columnWidth: 50,halign: 'center' },1: { columnWidth: 15,halign: 'center' },2: { columnWidth: 15,halign: 'center' },3: { columnWidth: 15 },4: { columnWidth: 15 },5: { columnWidth: 15 },
			//6: { columnWidth: 15 },7: { columnWidth: 15 },8: { columnWidth: 15 },9: { columnWidth: 15 },10: { columnWidth: 15 } ,10: { columnWidth: 15 } },
		startY: pdf.autoTable.previous.finalY + 2
	});

	//piede paginas
	const pageCount = pdf.internal.getNumberOfPages();
	for (var i = 1; i <= pageCount; i++) {
		pdf.setPage(i);

		pdf.setFontSize(14); //encabezado
		pdf.text(130, 15, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS');
		pdf.line(100, 17, 500, 17); // horizontal line
		pdf.setFontSize(8);
		pdf.text(262, 26, 'LISTA CON PARCIALES');
		pdf.roundedRect(102, 45, 400, 12, 3, 3);
		pdf.setFontSize(8);
		pdf.text(100, 40, `MATERIA: ${ClaveMateria} ${nomMateria}`);
		pdf.setFontSize(8);
		pdf.text(500, 31, `PERIODO: ${idPeriodo.rango}`);
		pdf.setFontSize(8);
		pdf.text(500, 40, `FECHA: ${moment(new Date()).format('DD/MM/YYYY')}`);
		pdf.setFontSize(7);
		pdf.text(122, 54, Horas_clases);
		pdf.setFontSize(8);
		pdf.text(500, 66, `GRUPO: ${Semestre} ${Grupo}`);
		pdf.setFontSize(8);
		pdf.text(100, 66, `DOCENTE: ${ClavePersonal} ${docente_actual}`);
		pdf.setFontSize(8);
		pdf.text(100, 74, `CARRERA: ${claveCarrera}  ${nombreCarrera}  ${ClavePlan}`);
		pdf.addImage(img, 'PNG', 13, 10, 63, 63);

		//pdf.setFontSize(7)//pie de pagina
		//pdf.text(20, 760, "C (Curso, R:Repetición, E:Especial)");
		//pdf.setLineWidth(1.6)
		pdf.setFillColor(255, 255, 255);
		pdf.roundedRect(10, 738, 270, 50, 3, 3, 'FD');
		pdf.setFontSize(7); //pie de pagina
		pdf.text(20, 750, 'OBSERVACIONES:');
		pdf.setFontSize(7); //pie de pagina
		pdf.text(283, 785, 'C (Curso, R:Repetición, E:Especial)');

		pdf.line(390, 760, 500, 760);
		pdf.setFontSize(7);
		pdf.text(413, 767, 'FIRMA DOCENTE');
		pdf.text(550, 785, 'Pagina' + String(i) + ' de ' + String(pageCount), null, null, null, null, 'right');
	}
	await pdf.save(`PARCIALES ${nomMateria}.pdf`);
};

//pdf acta final
const pdActaFinal = async(
	nomMateria,
	docente_actual,
	ClaveMateria,
	ClavePersonal,
	ClavePlan,
	nombreCarrera,
	claveCarrera,
	idPeriodo
) => {
	const Horas_clases = dataReportHorario[0].semanas;
	const Grupo = dataReportHorario[0].grupo;
	const Semestre = dataReportHorario[0].semestre;

	

	const pdf = new jsPDF('p', 'pt', 'letter');
	//body

	pdf.autoTable(Actacolumns, listaActa, {
		margin: { top: 78 },
		styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
		theme: 'grid',
		columnStyles: { 2: { halign: 'left' } }
	});

	let apro = pdf.autoTable.previous; // aprobacion ··3#############
	pdf.autoTable(
		ActacolumnsAprobacion,
		arrayAprobacion,
		{
			margin: { top: 0, left: 395 },
			styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
			theme: 'plain',
			tableWidth: 130,
			startY: pdf.autoTable.previous.finalY
		}
		//{ startY:false }
	);

	let repro = pdf.autoTable.previous; // reprobacion ··3#############
	pdf.autoTable(ActacolumnsReprobacion, arrayAprobacion, {
		margin: { top: 0, left: 395 },
		styles: { halign: 'center', cellPadding: 0.5, fontSize: 7 },
		theme: 'plain',
		tableWidth: 130,
		startY: pdf.autoTable.previous.finalY
	});

	//piede paginas
	const pageCount = pdf.internal.getNumberOfPages();
	for (var i = 1; i <= pageCount; i++) {
		pdf.setPage(i);

		pdf.setFontSize(14); //encabezado
		pdf.text(130, 15, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS');
		pdf.line(100, 17, 500, 17); // horizontal line
		pdf.setFontSize(8);
		pdf.text(262, 26, 'ACTA DE CALIFICACIÓN');
		pdf.roundedRect(102, 45, 400, 12, 3, 3);
		pdf.setFontSize(8);
		pdf.text(100, 40, `MATERIA: ${ClaveMateria}  ${nomMateria}  ${ClavePlan}`);
		pdf.setFontSize(8);
		pdf.text(500, 31, `PERIODO: ${idPeriodo.rango}`);
		pdf.setFontSize(8);
		pdf.text(500, 40, `FECHA: ${moment(new Date()).format('DD/MM/YYYY')}`);
		pdf.setFontSize(7);
		pdf.text(122, 54, Horas_clases);
		pdf.setFontSize(8);
		pdf.text(500, 66, `GRUPO: ${Semestre} ${Grupo}`);
		pdf.setFontSize(8);
		pdf.text(100, 66, `DOCENTE: ${ClavePersonal}  ${docente_actual}`);
		pdf.setFontSize(8);
		pdf.text(100, 74, `CARRERA: ${claveCarrera}  ${nombreCarrera}  ${ClavePlan}`);
		pdf.addImage(img, 'PNG', 13, 10, 63, 63);

		pdf.setFont('helvetica');
		pdf.setFontType('bold');
		pdf.setFontSize(7); //pie de pagina
		pdf.text(20, 752, '1RA Evaluación de 1ra Oportunidad, 2DA Evaluación de 2da Oportunidad');

		pdf.setFontSize(7); //pie de pagina
		pdf.text(20, 760, 'C (Curso, R:Repetición, E:Especial)');
		pdf.setLineWidth(1.6);
		pdf.line(390, 760, 500, 760);
		pdf.setFontSize(7);
		pdf.text(413, 767, 'FIRMA DOCENTE');
		pdf.text(20, 770, 'Pagina' + String(i) + ' de ' + String(pageCount), null, null, null, null, 'right');
	}
	await pdf.save(`Acta final ${nomMateria}.pdf`);
				listaActa=[]
};
