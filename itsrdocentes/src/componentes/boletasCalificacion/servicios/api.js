import {urlApi} from '../../servicios/api';
import swal from 'sweetalert';
import SelectPeriodo from '../selectPeriodo';
const axios = require('axios');



export async function getListaCarreras(periodo, numeroNuntrol,semestre) {
	try {
		let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		const response = await axios
			.get(`${urlApi}/api/reporte/consultar/carrera/alumno/${periodo}/${numeroNuntrol}/${semestre}`, TOKEN_USUARIO)
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
		let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		const response = await axios
			.get(`${urlApi}/api/reporte/consultar/carrera/calificaciones/${periodo}/${folio}/${idmateria}`, TOKEN_USUARIO)
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

//http://localhost:4001/api/reporte/consultar/carrera/catalogo/carrera/1/137/7/19
export async function getCatalogoCarrera(semestre, folio,periodo,idcarrera) {
	try {
		let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		const response = await axios
			.get(`${urlApi}/api/reporte/consultar/carrera/catalogo/carrera/${semestre}/${folio}/${periodo}/${idcarrera}`, TOKEN_USUARIO)
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
		let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		const response = await axios
			.get(`${urlApi}/api/reporte/consultar/lista/carreras/${periodo}/${semestre}/${idcarrera}`, TOKEN_USUARIO)
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
		let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		const response = await axios
			.get(`${urlApi}/api/reporte/consultar/carreras/semestre`, TOKEN_USUARIO)
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