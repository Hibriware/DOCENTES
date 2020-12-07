import swal from 'sweetalert';
import moment from 'moment';
import { ID_USUARIO } from '../../home';

const axios = require('axios');
export const urlApi = process.env.REACT_APP_SERVER_HOST; //http://212.237.52.166:4001
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
export var dataListaPeriodo = [];
export var FECHA_ACTUAL = [];


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
	try {
		await axios({
			method: 'POST',
			url: `/api/aspirante/registrar`,
			data: datas
		})
			.then((res) => console.log('correcto'))
			.catch(function(error) {
				swal('error!', 'Verifique su conexion a internet!', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

/*export async function saveListSubject(list_all_subject) {
	try {
		let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		await axios({
			method: 'POST',
			url: `${urlApi}/api/aspirante/save-subject`,
			data: list_all_subject
		},TOKEN_USUARIO)
			.then(() => swal('', 'Los temas se registraron correctamente', 'success'))
			.catch(function(error) {
				console.log(error);
				swal('error!', 'Verifique su conexion a internet!', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}*/

export async function saveListSubject(list_all_subject) {
	try {
		await axios.post(`/api/aspirante/save-subject`,list_all_subject)
			.then(() => swal('', 'Los temas se registraron correctamente', 'success'))
			.catch(function(error) {
				console.log(error);
				swal('error!', 'Verifique su conexion a internet!', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

export async function crearCalificacion(datas, unidad, id_criterios) {
	//crear calificacion alumno
	await axios
		.post(
			`/api/aspirante/calificacion`,
			{
				calR1: datas.calR1 || 0,
				calR2: datas.calR2 || 0,
				calR3: datas.calR3 || 0,
				calR4: datas.calR4 || 0,
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
				opcion: datas.opcion || 1,
				curso:datas.curso || 1,
			}
		)
		.then((res) => console.log('ok'))
		.catch(function(error) {
			console.log(error);
			swal('error!', 'Verifique su conexion a internet!', 'warning');
		});
}

//var config = {};

export async function getPeriodos() {//getPeriodo verificar-------------
	try {
		const response = await axios
			.get(`/api/administrador/lista/periodo/status`)
			.then((res) => {
				if (res.data.data.length) {
					//asignar fechas y periodods
					dataPeriodo = res.data.data;
					PERIODO_ACTUAL = res.data.data[0].periodo;
					return dataPeriodo;
				} else {
					console.log((FECHA_ACTUAL = res.data.fechaActual));
					return 'not'; // sin periodos activos
				}
			})
			.catch(function(error) {
				swal(' Sin periodos disponibles!', `${error}`, 'warning');
				return 'error';
			});
		//EXISTNCIA_ACTA = response[0].existenciaActa;
		return response;
	} catch (error) {
		console.log(error);
	}
}


export async function getListaCarreras() {
	try {
		const response = await axios
			.get(`${urlApi}/api/reporte/consultar/carreras`)
			.then((res) => res.data)
			.catch(function(error) {
				swal('!', `${error}`, 'warning');
				return false;
			});
		return response;
	} catch (error) {
		console.log(error);
	}
}




export async function getTemas(idMateria, minimo, cierre,materiaDocenteId,periodo) {
		await axios
		.get(`${urlApi}/api/aspirante/consultarTema/${ID_USUARIO}/${idMateria}/${periodo}/${minimo}/${cierre}/${materiaDocenteId}`)
		.then((res) => (datalista = res.data))
		.catch(function(error) {
			swal(
				'La materia actual no cuenta con temas asignados !',
				'Puede asignarlos en la pestaña  “CALENDARIO”',
				'warning'
			);
		});
}

export async function getTemasReportes(idMateria,materiaDocenteId,periodo) {
	let datos = await axios
		.get(`/api/reporte/consultarTema/${ID_USUARIO}/${idMateria}/${periodo}/${materiaDocenteId}`)
		.then((res) => res.data)
		.catch(function(error) {
			console.log(error);
			return false;
		});

	return datos;
}

export async function getTemasReportesAdmin(idMateria,materiaDocenteId,periodo,idUsuario) {
	let datos = await axios
		.get(`/api/reporte/consultarTema/${idUsuario}/${idMateria}/${periodo}/${materiaDocenteId}`)
		.then((res) => res.data)
		.catch(function(error) {
			console.log(error);
			return false;
		});
	return datos;
}

export async function getStatus_temas(id_usuario, id_materia,materiaDocenteId,periodos) {
	try {
		//PERIODO_ACTUAL, ID_USUARIO, materia
		await axios
			.get(
				`/api/aspirante/consultar/estado/temas/${periodos}/${id_materia}/${id_usuario}/${materiaDocenteId}`
			)
			.then((res) => (dataStatusTemas = res.data))
			.catch(function(error) {
				swal(' ', 'Verifique su conexion a internet!', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getAlumnos(idMateria, unidad, group, materiaDocente_id,periodo) {
		//consultarAlumnos/:idMateria/:periodo/:idDocente/:unidad
			await axios
			.get(
				`/api/aspirante/consultarAlumnos/${idMateria}/${periodo}/${ID_USUARIO}/${unidad}/${group}/${materiaDocente_id}`
			)
			.then((res) => {
				return datalistaAlumnos=res.data;
			})
			.catch(function(error) {
				swal('Error', 'No se encontró información!', 'warning');
			});
	}

export async function getCriterios(idMateria, unidad,materiaDocenteId,periodo) {
	try {
		await axios
			.get(
				`/api/administrador/consultarCriterios/${periodo}/${idMateria}/${unidad}/${materiaDocenteId}`)
			.then((res) => (dataCriterios = res.data))
			.catch(function(error) {
				swal('Sin temas disponibles!', ' o Verifique su conexion a internet!', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

export async function putCriteriosc1(materia, unidad, grupo, porcentageC1, criterio1,materiaDocenteId,periodo) {
	try {
		//let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		await axios
			.put(
				`/api/aspirante/update/criteriosc1/${periodo}/${materia}/${unidad}/${grupo}/${materiaDocenteId}`,
				{
					criterio1: criterio1,
					porcentageC1: porcentageC1
				},
		//		TOKEN_USUARIO
			)
			.then(function(response) {
				console.log("");
			})
			.catch(function(error) {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
}

export async function putCriteriosc2(materia, unidad, grupo, porcentageC2, criterio2,materiaDocenteId,periodo) {
	try {
		await axios
			.put(
				`/api/aspirante/update/criteriosc2/${periodo}/${materia}/${unidad}/${grupo}/${materiaDocenteId}`,
				{
					criterio2: criterio2,
					porcentageC2: porcentageC2
				}
			)
			.then(function(response) {
				console.log("");
			})
			.catch(function(error) {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
}

export async function putCriteriosc3(materia, unidad, grupo, porcentageC3, criterio3,materiaDocenteId,periodo) {
	try {
		await axios
			.put(
				`/api/aspirante/update/criteriosc3/${periodo}/${materia}/${unidad}/${grupo}/${materiaDocenteId}`,
				{
					criterio3: criterio3,
					porcentageC3: porcentageC3
				}
			)
			.then(function(response) {
				console.log("");
			})
			.catch(function(error) {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
}

export async function putCriteriosc4(materia, unidad, grupo, porcentageC4, criterio4,materiaDocenteId,periodo) {
	try {

		await axios
			.put(
				`/api/aspirante/update/criteriosc4/${periodo}/${materia}/${unidad}/${grupo}/${materiaDocenteId}`,
				{
					criterio4: criterio4,
					porcentageC4: porcentageC4 || 0
				}
			)
			.then(function(response) {
				console.log("");
			})
			.catch(function(error) {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
}

export async function updateCalificaion(idCalificacion, data) {
	// actalizar calificacion
	await axios
		.put(
			`/api/aspirante/update/calificaciones/${idCalificacion}`,
			{
				calCriterio1: data.calCriterio1 || 0,
				calCriterio2: data.calCriterio2 || 0,
				calCriterio3: data.calCriterio3 || 0,
				calCriterio4: data.calCriterio4 || 0,
				calificaciontotal: data.calificaciontotal || 0,
				calR1: data.calR1 || 0,
				calR2: data.calR2 || 0,
				calR3: data.calR3 || 0,
				calR4: data.calR4 || 0,
				opcion: data.opcion
			}
		)
		.then(function(response) {
			console.log("");
		})
		.catch(function(error) {
			console.log(error);
		});
}

export async function materiasD(periodo) {
	try {
		const resul = await axios
			.get(`/api/aspirante/consultar/${ID_USUARIO}/${periodo}`)
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

export async function getReporteHorarios(periodo, idMateria, grupo,materiaDocenteId) {
	try {
		await axios
			.get(
				`/api/reporte/consultar/reporte/time/${periodo}/${idMateria}/${ID_USUARIO}/${grupo}/${materiaDocenteId}`
			)
			.then((res) => (dataReportHorario = res.data))
			.catch(function(error) {
				console.log(error)
				swal('error al buscar los horarios!', 'Verifique su conexión a internet', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getReporteHorariosAdmin(periodo, idMateria, grupo,materiaDocenteId,idUsuario) {
	try {
		await axios
			.get(
				`/api/reporte/consultar/reporte/horarios/${periodo}/${idMateria}/${idUsuario}/${grupo}/${materiaDocenteId}`
			)
			.then((res) => (dataReportHorario = res.data))
			.catch(function(error) {
				console.log(error)
				swal('error al buscar los horarios!', 'Verifique su conexión a internet', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getReportSchedule(periodo, idMateria, grupo,materiaDocenteId,idPersonal) {
	try {
		await axios
			.get(
				`/api/reporte/consultar/reporte/horarios/${periodo}/${idMateria}/${idPersonal}/${grupo}/${materiaDocenteId}`
			)
			.then((res) => (dataReportHorario = res.data))
			.catch(function(error) {
				console.log(error)
				swal('error al buscar los horarios!', 'Verifique su conexión a internet', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getReporteLista(periodo, idMateria, grupo,materiaDocenteId) {
	try {
		await axios
			.get(
				`/api/reporte/consultar/reporte/lista/${periodo}/${idMateria}/${ID_USUARIO}/${grupo}/${materiaDocenteId}`
			)
			.then((res) => (dataReportLista = res.data))
			.catch(function(error) {
				console.log(error)
				swal('error al buscar lista!', 'Verifique su conexión a internet', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getReportList(periodo, idMateria, grupo,materiaDocenteId,idPersonal) {
	try {
		await axios
			.get(
				`/api/reporte/consultar/reporte/lista/${periodo}/${idMateria}/${idPersonal}/${grupo}/${materiaDocenteId}`
			)
			.then((res) => (dataReportLista = res.data))
			.catch(function(error) {
				console.log(error)
				swal('error al buscar lista!', 'Verifique su conexión a internet', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}



export function update(id, data) {
	return request(`/materias/${id}`, 'POST', data);
}

export function borrer(id) {
	return request(`/materias/${id}`, 'DELETE');
}


//data administrador _____________________________________________
export async function getListaPeriodo() {
	try {
		let respon = await axios
			.get(`/api/administrador/lista/periodo`)
			.then((res) => res.data)
			.catch(function(error) {
				swal('!', `${error}`, 'warning');
				return [];
			});
		return respon;
	} catch (error) {
		console.log(error);
	}
}

export async function crearRegistrosfechas(datas) {
	try {
		await axios
			.post(
				`/api/administrador/fechas/registrar`,
				{
					primera_entrega: moment(datas.primera).format('YYYY-MM-DD'),
					segunda_entrega: moment(datas.segunda).format('YYYY-MM-DD'),
					tercera_entrega: moment(datas.tercera).format('YYYY-MM-DD'),
					entrega_final: moment(datas.final).format('YYYY-MM-DD'),
					status: datas.status,
					habilitar_todas: datas.temas,
					periodo: datas.periodo
				}
			)
			.then((res) => swal('', `FECHAS REGISTRADAS`, 'success'))
			.catch(function(error) {
				console.log(error);
				swal('error!', 'Ocurrió un error al intentar guardar las fechas de entrega.!', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
	//crear calificacion alumno
}


export async function updateRegistrosfechas(datas) {
	try {
		await axios
			.put(
				`/api/administrador/fechas/actualizar/${datas.periodo}`,
				{
					primera_entrega: moment(datas.primera).format('YYYY-MM-DD'),
					segunda_entrega: moment(datas.segunda).format('YYYY-MM-DD'),
					tercera_entrega: moment(datas.tercera).format('YYYY-MM-DD'),
					entrega_final: moment(datas.final).format('YYYY-MM-DD'),
					status: datas.status,
					habilitar_todas: datas.temas,
					periodo: datas.periodo
				}
			)
			.then((res) => swal('', `Registros actualizados: (${datas.periodo})`, 'success'))
			.catch(function(error) {
				console.log(error);
				swal('error!', 'Verifique su conexion a internet!', 'warning');
			});
	} catch (error) {
		console.log(error);
	}
}

export async function getAdmiFechas(periodo) {//administrador
	try {
		let respon = await axios
			.get(`/api/administrador/fechas/${periodo || PERIODO_ACTUAL}`)
			.then((res) => {
				dataFechasCierre = res.data;
				return true;
			})
			.catch(function(error) {
				console.log(error)
				swal('', 'Intente más tarde, servicio no disponible', 'warning');
				return false;
			});
		return respon;
	} catch (error) {
		console.log(error);
	}
}

export async function restablecerStatus(periodo) {
	try {
		let respon = await axios
			.get(`/api/administrador/fechas/actualizar/columna`)
			.then((res) => {
				return true;
			})
			.catch(function(error) {
				swal('', 'Probablemente el administrador no ha asignado las fechas de cierre ', 'warning');
				return false;
			});

		return respon;
	} catch (error) {
		console.log(error);
	}
}

export async function getStatusPeriodo() {
	try {
		let respons = await axios
			.get(`/api/administrador/lista/periodo/status`)
			.then((res) => {
				if (res.data.data.length) {
					return res.data.data[0];
				} else {
					return false;
				}
			})
			.catch(function(error) {
				swal('', 'No se encontraron TEMAS finalizados.', 'warning');
				console.log(error);
				return false;
			});

		return respons;
	} catch (error) {
		console.log(error);
	}
}

//periodo materia personal grupo

export async function getReporteParcial(materia, grupo,idMateriaDocente,periodo) {
	try {
		await axios
			.get(
				`/api/reporte/consultar/parciales/${periodo}/${materia}/${ID_USUARIO}/${grupo}/${idMateriaDocente}`
			)
			.then((res) => {
				dataReporteParciales = res.data;
			})
			.catch(function(error) {
				swal('', 'sin conexión', 'warning');
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
}


export async function getReporteParcialAdmin(materia, grupo,periodo,idUsuario,idMateriaDocente) {
	try {
		await axios
			.get(
				`/api/reporte/consultar/parciales/${periodo}/${materia}/${idUsuario}/${grupo}/${idMateriaDocente}`
			)
			.then((res) => {
				dataReporteParciales = res.data;
			})
			.catch(function(error) {
				swal('', 'sin conexión', 'warning');
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
}
