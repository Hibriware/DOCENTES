import swal from 'sweetalert';
import { ID_USUARIO } from '../../App';
const axios = require('axios')
const urlApi = 'http://localhost:4000';


export var PERIODO_ACTUAL;
export var datalista = [];
export var datalistaAlumnos = [];
export var dataCriterios = [];
export var dataStatusTemas = [];
export var dataReportHorario = [];
export var dataReportLista = [];
export var dataPeriodo = [];



async function request(url, metodo, data) {

  const response = await fetch(`${urlApi}${url}`, {
    metodo,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'aplication/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  const jsonReponse = await response.json();
  return jsonReponse;
}

export function treeApi(datas) {
  console.log(datas)
  axios({
    method: 'POST',
    url: `${urlApi}/api/personal/add`,
    data: datas
  }).then(res => console.log(res))
    .catch(function (error) {
      swal("error!", "Verifique su conexion a internet!", "warning");
    })
}


export async function crearCalificacion(datas, unidad, id_criterios) {//crear calificacion alumno
  await axios.post(`${urlApi}/api/personal/add/calificacion`, {
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
    periodo: datas.idnomenclaturaPeriodo
  }).then(res => console.log(res))
    .catch(function (error) {
      console.log(error)
      swal("error!", "Verifique su conexion a internet!", "warning");
    })
}



export async function getPeriodo() {
  console.log("periodo")
  const response = await axios.get(`${urlApi}/api/personal/consultar/periodo`)
    .then(res => dataPeriodo = res.data)
    .catch(function (error) {
      swal(" Sin periodos disponibles!", ":) ", "warning");
    })
  PERIODO_ACTUAL = response[0].periodo;
  return response;
}

export async function getTemas(idDocente, idMateria, cierre) {
  await axios.get(`${urlApi}/api/personal/consultarTema/${idDocente}/${idMateria}/${PERIODO_ACTUAL}/${cierre}`)
    .then(res => datalista = res.data)
    .catch(function (error) {
      swal(" Actualmente no cuenta con temas disponibles!", " o Verifique su conexión a internet", "warning");

    })
}

export async function getStatus_temas(id_usuario, id_materia) { //PERIODO_ACTUAL, ID_USUARIO, materia 
  await axios.get(`${urlApi}/api/personal/consultar/estado/temas/${PERIODO_ACTUAL}/${id_materia}/${id_usuario}`)
    .then(res => dataStatusTemas = res.data)
    .catch(function (error) {
      swal(" ", "Verifique su conexion a internet!", "warning");
    })
}

export async function getAlumnos(idMateria, unidad) {//consultarAlumnos/:idMateria/:periodo/:idDocente/:unidad
  console.log('Actualizando alumnos--------------------------------')
  await axios.get(`${urlApi}/api/personal/consultarAlumnos/${idMateria}/${PERIODO_ACTUAL}/${ID_USUARIO}/${unidad}`)
    .then(res => datalistaAlumnos = res.data)
    .catch(function (error) {
      swal("Error", "Verifique su conexion a internet!", "warning");

    })
}

export async function getCriterios(idMateria, unidad) {
  await axios.get(`${urlApi}/api/personal/consultarCriterios/${PERIODO_ACTUAL}/${idMateria}/${unidad}`)
    .then(res => dataCriterios = res.data)
    .catch(function (error) {
      swal("Sin temas disponibles!", " o Verifique su conexion a internet!", "warning");
    })
}


export async function putCriteriosc1(materia, unidad, grupo, porcentageC1, criterio1) {
  await axios.put(`${urlApi}/api/personal/update/criteriosc1/${PERIODO_ACTUAL}/${materia}/${unidad}/${grupo}`, {
    criterio1: criterio1,
    porcentageC1: porcentageC1,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function putCriteriosc2(materia, unidad, grupo, porcentageC2, criterio2) {
  await axios.put(`${urlApi}/api/personal/update/criteriosc2/${PERIODO_ACTUAL}/${materia}/${unidad}/${grupo}`, {
    criterio2: criterio2,
    porcentageC2: porcentageC2,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function putCriteriosc3(materia, unidad, grupo, porcentageC3, criterio3) {
  await axios.put(`${urlApi}/api/personal/update/criteriosc3/${PERIODO_ACTUAL}/${materia}/${unidad}/${grupo}`, {
    criterio3: criterio3,
    porcentageC3: porcentageC3,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

}

export async function putCriteriosc4(materia, unidad, grupo, porcentageC4, criterio4) {
  await axios.put(`${urlApi}/api/personal/update/criteriosc4/${PERIODO_ACTUAL}/${materia}/${unidad}/${grupo}`, {
    criterio4: criterio4,
    porcentageC4: porcentageC4,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}


export async function updateCalificaion(idCalificacion, data) {// actalizar calificacion
  await axios.put(`${urlApi}/api/personal/update/calificaciones/${idCalificacion}`, {
    calCriterio1: data.calCriterio1,
    calCriterio2: data.calCriterio2,
    calCriterio3: data.calCriterio3,
    calCriterio4: data.calCriterio4,
    calificaciontotal: data.calificaciontotal,
    calR1: data.calR1,
    calR2: data.calR2,
    calR3: data.calR3,
    calR4: data.calR4,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

}

export async function materiasD() {
  try {
    const resul = await axios.get(`${urlApi}/api/personal/consultar/${ID_USUARIO}/${PERIODO_ACTUAL}`)
      .then(res => res.data)
      .catch(function (res) {
        res = 'error'
        return res;
      })
    return resul;
  } catch (error) {
    console.log(error + ' en la peticion materias')
  }
}

export async function getReporteHorarios(periodo, idMateria, grupo) {
  await axios.get(`${urlApi}/api/personal/consultar/reporte/horarios/${periodo}/${idMateria}/${ID_USUARIO}/${grupo}`)
    .then(res => dataReportHorario = res.data)
    .catch(function (error) {
      swal("error al buscar los horarios!", "Verifique su conexión a internet", "warning");
    })
}


export async function getReporteLista(periodo, idMateria, grupo) {
  await axios.get(`${urlApi}/api/personal/consultar/reporte/lista/${periodo}/${idMateria}/${ID_USUARIO}/${grupo}`)
    .then(res => dataReportLista = res.data)
    .catch(function (error) {
      swal("error al buscar lista!", "Verifique su conexión a internet", "warning");
    })
}



export function update(id, data) {
  return request(`/materias/${id}`, 'POST', data);
}


export function borrer(id) {
  return request(`/materias/${id}`, 'DELETE');
}
