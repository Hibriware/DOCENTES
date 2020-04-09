import swal from 'sweetalert';
import { ID_USUARIO , PERIODO_ACTUAL } from '../../App';
const axios = require('axios')
const urlApi = 'http://localhost:4000';


export var datalista = [];
export var datalistaAlumnos = [];
export var dataCriterios = [];
export var dataStatusTemas = [];
export var dataReportHorario = [];
export var dataReportLista = [];





async function request(url, metodo, data) {
  console.log(data)
  console.log(metodo)

  console.log(url)

  const response = await fetch(`${urlApi}${url}`, {
    metodo,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'aplication/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });/*  */
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
  // return request('/api/personal/add','POST',data);
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
  // return request('/api/personal/add','POST',data);
}





export async function getTemas(idDocente, idMateria, periodo, cierre) {
  await axios.get(`${urlApi}/api/personal/consultarTema/${idDocente}/${idMateria}/${periodo}/${cierre}`)
    .then(res => datalista = res.data)
    .catch(function (error) {
      //console.log(error);
      swal(" Actualmente no cuenta con temas disponibles!", " o Verifique su conexión a internet", "warning");

    })
}

export async function getStatus_temas(periodo, id_usuario, id_materia) { //PERIODO_ACTUAL, ID_USUARIO, materia 

  await axios.get(`${urlApi}/api/personal/consultar/estado/temas/${periodo}/${id_materia}/${id_usuario}`)
    .then(res => dataStatusTemas = res.data)
    .catch(function (error) {
      //console.log(error);
      swal(" ", "Verifique su conexion a internet!", "warning");
    })
}

export async function getAlumnos(idMateria, unidad) {//consultarAlumnos/:idMateria/:periodo/:idDocente/:unidad
  console.log('Actualizando alumnos--------------------------------')
  await axios.get(`${urlApi}/api/personal/consultarAlumnos/${idMateria}/${PERIODO_ACTUAL}/${ID_USUARIO}/${unidad}`)
    .then(res => datalistaAlumnos = res.data)
    .catch(function (error) {
      //console.log(error);
      swal("Error", "Verifique su conexion a internet!", "warning");

    })
}


export async function getCriterios(periodo, idMateria, unidad) {
  await axios.get(`${urlApi}/api/personal/consultarCriterios/${periodo}/${idMateria}/${unidad}`)
    .then(res => dataCriterios = res.data)
    .catch(function (error) {
      //console.log(error);
      swal("Sin temas disponibles!", " o Verifique su conexion a internet!", "warning");


    })
}



export async function putCriteriosc1(periodo, materia, unidad, grupo, porcentageC1, criterio1) {
  await axios.put(`${urlApi}/api/personal/update/criteriosc1/${periodo}/${materia}/${unidad}/${grupo}`, {
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

export async function putCriteriosc2(periodo, materia, unidad, grupo, porcentageC2, criterio2) {
  await axios.put(`${urlApi}/api/personal/update/criteriosc2/${periodo}/${materia}/${unidad}/${grupo}`, {
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

export async function putCriteriosc3(periodo, materia, unidad, grupo, porcentageC3, criterio3) {
  await axios.put(`${urlApi}/api/personal/update/criteriosc3/${periodo}/${materia}/${unidad}/${grupo}`, {
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

export async function putCriteriosc4(periodo, materia, unidad, grupo, porcentageC4, criterio4) {
  await axios.put(`${urlApi}/api/personal/update/criteriosc4/${periodo}/${materia}/${unidad}/${grupo}`, {
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
    calCriterio1:data.calCriterio1,
    calCriterio2:data.calCriterio2,
    calCriterio3:data.calCriterio3,
    calCriterio4:data.calCriterio4,
    calificaciontotal:data.calificaciontotal,
    calR1:data.calR1,
    calR2:data.calR2,
    calR3:data.calR3,
    calR4:data.calR4,
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

}








export async function materiasD() {
 const resul = await axios.get(`${urlApi}/api/personal/consultar/${ID_USUARIO}`)
    .then(res => res.data)
    .catch(function (res) {
      res = 'error'
      return res;
    })
    return resul;
}

//reportes http://localhost:4000/api/personal/consultar/reporte/lista/7/403/251/11
export async function getReporteHorarios(periodo, idMateria,grupo) {
  await axios.get(`${urlApi}/api/personal/consultar/reporte/horarios/${periodo}/${idMateria}/${ID_USUARIO}/${grupo}`)
    .then(res => dataReportHorario = res.data)
    .catch(function (error) {
      //console.log(error);
      swal("error al buscar los horarios!", "Verifique su conexión a internet", "warning");
    })
}

export async function getReporteLista(periodo, idMateria,grupo) {
  await axios.get(`${urlApi}/api/personal/consultar/reporte/lista/${periodo}/${idMateria}/${ID_USUARIO}/${grupo}`)
    .then(res => dataReportLista = res.data)
    .catch(function (error) {
      //console.log(error);
      swal("error al buscar lista!", "Verifique su conexión a internet", "warning");
    })
}


/*export function materiasD() {
  return request(`/api/personal/consultar/${ID_USUARIO}`, 'Get');
}*/
export function update(id, data) {
  return request(`/materias/${id}`, 'POST', data);
}


export function borrer(id) {
  return request(`/materias/${id}`, 'DELETE');
}
