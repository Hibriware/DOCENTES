import swal from 'sweetalert';
const axios = require('axios');



export async function getListaCarreras(periodo, numeroNuntrol) {
	try {
		const response = await axios
			.get(`/api/reporte/consultar/carrera/alumno/${periodo}/${numeroNuntrol}/${1}`)
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

//reporte/consultar/carrera/calificaciones/7/137/402
export async function getCalificaciones(periodo, folio,idmateria) {
	try {
		const response = await axios
			.get(`/api/reporte/consultar/carrera/calificaciones/${periodo}/${folio}/${idmateria}`)
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
//Nuevo acceso
export async function getCalificacionesnew(periodo, folio,idmateria) {
	try {
		const response = await axios
			.get(`/api/reporte/consultar/carrera/calificaciones/boleta/`, {params: { periodo, folio, idmateria}})
			.then((res) => res.data)
			.catch(function(error) {
				swal('!', `${error}`, 'warning');
			});
		return response;
	} catch (error) {
		console.log(error);
	}
}

//http://localhost:4001/api/reporte/consultar/carrera/catalogo/carrera/1/137/7/19
export async function getCatalogoCarrera(semestre, folio,periodo,idcarrera) {
	try {

		const response = await axios
			.get(`/api/reporte/consultar/carrera/catalogo/carrera/${semestre}/${folio}/${periodo}/${idcarrera}`)
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

export async function getListaControlesCarrera(periodo, semestre,idcarrera) {
	try {
		const response = await axios
			.get(`/api/reporte/consultar/lista/carreras/${periodo}/${semestre}/${idcarrera}`)
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



export async function getCatalogoSemestre() {
	try {
		const response = await axios
			.get(`/api/reporte/consultar/carreras/semestre`)
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

//refactoris
export async function getSearchMatter(folio, control,periodo, semestre) {
	try {
		const response = await axios
			.get(`/api/reporte/consultar/materias/control/${folio}/${control}/${periodo}/${semestre}`)
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


	//folio, periodo, semestre
	export async function getMatterRatings(folio, periodo,semestre) {
		try {
			const response = await axios
				.get(`/api/reporte/consultar/calificacion/control/${folio}/${periodo}/${semestre}`)
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
