import swal from 'sweetalert';
import moment from 'moment';
import { ID_USUARIO } from '../../home';

const axios = require('axios')
const urlApi = 'http://212.237.52.166:4000'; //https://app-api-docentes.herokuapp.com

export var PERIODO_ACTUAL, EXISTNCIA_ACTA;
export var datalista = [];
export var datalistaAlumnos = [];
export var dataCriterios = [];
export var dataStatusTemas = [];
export var dataReportHorario = [];
export var dataReportLista = [];
export var dataPeriodo = [];
export var dataFechasCierre = [];
export var dataReporteParciales = [];
export var FECHA_ACTUAL = [];


/*export class token{

    constructor(props){
      super(props)
      this.AuthServise = new AuthServise()
        }
  }*/

/*  function isLoggedIn(){
    console.log("met isLoggedIn")
    return !! getToken();
}


function getToken(){
    return localStorage.getItem('token_id');
}*/

async function request(url, metodo, data) {
	const response = await fetch(`${urlApi}${url}`, {
		metodo,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'aplication/json'
		},
		body: data ? JSON.stringify(data) : undefined
	});
	const jsonReponse = await response.json();
	return jsonReponse;
}

export async function treeApi(datas) {
	console.log(datas);
await axios({
		method: 'POST',
		url: `${urlApi}/api/aspirante/registrar`,
		data: datas
	})
		.then((res) => console.log(res.data))
		.catch(function(error) {
			swal('error!', 'Verifique su conexion a internet!', 'warning');
		});
}

export async function crearCalificacion(datas, unidad, id_criterios) {
	//crear calificacion alumno
	await axios
		.post(`${urlApi}/api/aspirante/calificacion`, {
			calR1: datas.calR1,
			calR2: datas.calR2,
			calR3: datas.calR3,
			calR4: datas.calR4,
			calCriterio1: datas.calCriterio1,
			calCriterio2: datas.calCriterio2,
			calCriterio3: datas.calCriterio3,
			calCriterio4: datas.calCriterio4,
			calificaciontotal: datas.calificaciontotal,
			unidad: unidad,
			idGrupoAsign: datas.asignacionGrupo_idgrupo,
			materias_idmaterias: datas.idMateria,
			materiaDocente_id: datas.idMateriaDocente,
			criterios_idcat_Unidad: id_criterios,
			aspirante_Folio: datas.folioAspirante,
			periodo: datas.idnomenclaturaPeriodo,
			opcion: datas.opcion
		})
		.then((res) => console.log(res.data))
		.catch(function(error) {
			console.log(error);
			swal('error!', 'Verifique su conexion a internet!', 'warning');
		});
}
var config = {};

export async function getPeriodo() {
	try {
		config = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		console.log('periodo');
		console.log(config);

		const response = await axios
			.get(`${urlApi}/api/otros/consultar/periodo`, config)
			.then((res) => {
				dataPeriodo = res.data.datas
				FECHA_ACTUAL =res.data.fechaActual
			   return dataPeriodo
			})
			.catch(function(error) {
				swal(' Sin periodos disponibles!', `${error}`, 'warning');
				return 'error';
			});
			console.log()
			console.log("______")

		PERIODO_ACTUAL = response[0].periodo;
		EXISTNCIA_ACTA = response[0].existenciaActa;
		
		return response;
	} catch (error) {
		console.log(error);
	}
}

export async function getTemas(idMateria, minimo, cierre) {
	await axios
		.get(`${urlApi}/api/aspirante/consultarTema/${ID_USUARIO}/${idMateria}/${PERIODO_ACTUAL}/${minimo}/${cierre}`)
		.then((res) => (datalista = res.data))
		.catch(function(error) {
			swal(
				'La materia actual no cuenta con temas asignados !',
				'Puede asignarlos en la pestaña  “CALENDARIO”',
				'warning'
			);
		});
}

export async function getStatus_temas(id_usuario, id_materia) {
	//PERIODO_ACTUAL, ID_USUARIO, materia
	await axios
		.get(`${urlApi}/api/aspirante/consultar/estado/temas/${PERIODO_ACTUAL}/${id_materia}/${id_usuario}`)
		.then((res) => (dataStatusTemas = res.data))
		.catch(function(error) {
			swal(' ', 'Verifique su conexion a internet!', 'warning');
		});
}

export async function getAlumnos(idMateria, unidad) {
	//consultarAlumnos/:idMateria/:periodo/:idDocente/:unidad
	console.log('Actualizando alumnos--------------------------------');
	await axios
		.get(`${urlApi}/api/aspirante/consultarAlumnos/${idMateria}/${PERIODO_ACTUAL}/${ID_USUARIO}/${unidad}`)
		.then((res) => (datalistaAlumnos = res.data))
		.catch(function(error) {
			swal('Error', 'Verifique su conexion a internet!', 'warning');
		});
}

export async function getCriterios(idMateria, unidad) {
	await axios
		.get(`${urlApi}/api/administrador/consultarCriterios/${PERIODO_ACTUAL}/${idMateria}/${unidad}`)
		.then((res) => (dataCriterios = res.data))
		.catch(function(error) {
			swal('Sin temas disponibles!', ' o Verifique su conexion a internet!', 'warning');
		});
}

export async function putCriteriosc1(materia, unidad, grupo, porcentageC1, criterio1) {
	await axios
		.put(`${urlApi}/api/aspirante/update/criteriosc1/${PERIODO_ACTUAL}/${materia}/${unidad}/${grupo}`, {
			criterio1: criterio1,
			porcentageC1: porcentageC1
		})
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function(error) {
			console.log(error);
		});
}

export async function putCriteriosc2(materia, unidad, grupo, porcentageC2, criterio2) {
	await axios
		.put(`${urlApi}/api/aspirante/update/criteriosc2/${PERIODO_ACTUAL}/${materia}/${unidad}/${grupo}`, {
			criterio2: criterio2,
			porcentageC2: porcentageC2
		})
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function(error) {
			console.log(error);
		});
}

export async function putCriteriosc3(materia, unidad, grupo, porcentageC3, criterio3) {
	await axios
		.put(`${urlApi}/api/aspirante/update/criteriosc3/${PERIODO_ACTUAL}/${materia}/${unidad}/${grupo}`, {
			criterio3: criterio3,
			porcentageC3: porcentageC3
		})
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function(error) {
			console.log(error);
		});
}

export async function putCriteriosc4(materia, unidad, grupo, porcentageC4, criterio4) {
	await axios
		.put(`${urlApi}/api/aspirante/update/criteriosc4/${PERIODO_ACTUAL}/${materia}/${unidad}/${grupo}`, {
			criterio4: criterio4,
			porcentageC4: porcentageC4
		})
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function(error) {
			console.log(error);
		});
}

export async function updateCalificaion(idCalificacion, data) {
	// actalizar calificacion
	await axios
		.put(`${urlApi}/api/aspirante/update/calificaciones/${idCalificacion}`, {
			calCriterio1: data.calCriterio1,
			calCriterio2: data.calCriterio2,
			calCriterio3: data.calCriterio3,
			calCriterio4: data.calCriterio4,
			calificaciontotal: data.calificaciontotal,
			calR1: data.calR1,
			calR2: data.calR2,
			calR3: data.calR3,
			calR4: data.calR4,
			opcion: data.opcion
		})
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function(error) {
			console.log(error);
		});
}

export async function materiasD() {
	try {
		const resul = await axios
			.get(`${urlApi}/api/aspirante/consultar/${ID_USUARIO}/${PERIODO_ACTUAL}`)
			.then((res) => {
				if (res.data.datas.length) {
					return res.data.datas;
				} else {
					return 'error';
				}
			})
			.catch(function(res) {
				res = 'error';
				return res;
			});
		return resul;
	} catch (error) {
		console.log(error + ' en la peticion materias');
	}
}

export async function getReporteHorarios(periodo, idMateria, grupo) {
	await axios
		.get(`${urlApi}/api/reporte/consultar/reporte/horarios/${periodo}/${idMateria}/${ID_USUARIO}/${grupo}`)
		.then((res) => (dataReportHorario = res.data))
		.catch(function(error) {
			swal('error al buscar los horarios!', 'Verifique su conexión a internet', 'warning');
		});
}

export async function getReporteLista(periodo, idMateria, grupo) {
	await axios
		.get(`${urlApi}/api/reporte/consultar/reporte/lista/${periodo}/${idMateria}/${ID_USUARIO}/${grupo}`)
		.then((res) => (dataReportLista = res.data))
		.catch(function(error) {
			swal('error al buscar lista!', 'Verifique su conexión a internet', 'warning');
		});
}

export function update(id, data) {
	return request(`/materias/${id}`, 'POST', data);
}

export function borrer(id) {
	return request(`/materias/${id}`, 'DELETE');
}

//data administrador
export async function crearRegistrosfechas(datas) {
	//crear calificacion alumno
	await axios
		.post(`${urlApi}/api/administrador/fechas/registrar`, {
			primera_entrega: moment(datas.primera).format('YYYY-MM-DD'),
			segunda_entrega: moment(datas.segunda).format('YYYY-MM-DD'),
			tercera_entrega: moment(datas.tercera).format('YYYY-MM-DD'),
			entrega_final: moment(datas.final).format('YYYY-MM-DD'),
			periodo: PERIODO_ACTUAL
		})
		.then((res) => swal('', `FECHAS REGISTRADAS AL PERIODO ${PERIODO_ACTUAL}`, 'success'))
		.catch(function(error) {
			console.log(error);
			swal('error!', 'Verifique su conexion a internet!', 'warning');
		});
}

export async function getAdmiFechas() {
	await axios
		.get(`${urlApi}/api/administrador/fechas/${PERIODO_ACTUAL}`)
		.then((res) => (dataFechasCierre = res.data))
		.catch(function(error) {
			swal('', 'Probablemente el administrador no ha asignado las fechas de cierre ', 'warning');
		});
}
//periodo materia personal grupo

export async function getReporteParcial(materia, grupo) {
	await axios
		.get(`${urlApi}/api/reporte/consultar/parciales/${PERIODO_ACTUAL}/${materia}/${ID_USUARIO}/${grupo}`)
		.then((res) => (dataReporteParciales = res.data))
		.catch(function(error) {
			swal('', 'No se encontraron TEMAS finalizados.', 'warning');
			console.log(error);
		});
}
