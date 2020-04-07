import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import swal from 'sweetalert';
import './calificaciones.css';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

//variables
import { useStyles } from './dialogos_calificacion';
import { dataMateria } from '../../../home';
import { getTemas } from '../../servicios/api';
import { datalista } from '../../servicios/api';
import { getAlumnos } from '../../servicios/api';
import { datalistaAlumnos } from '../../servicios/api';
import { getCriterios } from '../../servicios/api';
import { dataCriterios } from '../../servicios/api';
import { putCriteriosc1 } from '../../servicios/api';
import { putCriteriosc2 } from '../../servicios/api';
import { putCriteriosc3 } from '../../servicios/api';
import { crearCalificacion } from '../../servicios/api';
import { updateCalificaion } from '../../servicios/api';
import { fecha1, fecha2, fecha3 } from '../../../home';
import { PERIODO_ACTUAL } from '../../../App';


export var unidad_Tema;
let ccx1 = 0, ccx2 = 0, ccx3 = 0, unidadCalificacion, id_criterios;
let periodo, materia, unidad, grupo;

export async function enviarCriteriosc1(porcentageC1, criterio1) {//inicio guardar porcentaje 1 y criterio 1
  // let periodo, materia, unidad, grupo
  periodo = dataCriterios[0].periodo;
  materia = dataCriterios[0].materias_idmaterias;
  unidad = dataCriterios[0].numUnidad;
  grupo = dataCriterios[0].asingnacion_grupo_id;

  await putCriteriosc1(periodo, materia, unidad, grupo, porcentageC1, criterio1)
  //data  criterio1 porcentageC1
  //parametros update periodo, materia, unidad, grupo
}//fin


export async function enviarCriteriosc2(porcentageC1, criterio1) {//inicio guardar porcentaje 2 y criterio 2
  //  let periodo, materia, unidad, grupo
  periodo = dataCriterios[0].periodo;
  materia = dataCriterios[0].materias_idmaterias;
  unidad = dataCriterios[0].numUnidad;
  grupo = dataCriterios[0].asingnacion_grupo_id;

  await putCriteriosc2(periodo, materia, unidad, grupo, porcentageC1, criterio1)
  //data  criterio1 porcentageC1
  //parametros update periodo, materia, unidad, grupo
}//fin


export async function enviarCriteriosc3(porcentageC1, criterio1) {//inicio guardar porcentaje 3 y criterio 3
  // let periodo, materia, unidad, grupo
  periodo = dataCriterios[0].periodo;
  materia = dataCriterios[0].materias_idmaterias;
  unidad = dataCriterios[0].numUnidad;
  grupo = dataCriterios[0].asingnacion_grupo_id;

  await putCriteriosc3(periodo, materia, unidad, grupo, porcentageC1, criterio1)
  //data  criterio1 porcentageC1
  //parametros update periodo, materia, unidad, grupo
}//fin

var idDocenteActual, idMateriaActual, periodoActual, cierreActual; // fun buscarTtema

export const MaterialTableDemo = () => {//inicio

  const estilos = useStyles();
  // const [materiaID, setMateriaid] = React.useState('');//id materia para filtrar unidades
  const [listasTemas, setListas] = React.useState([]);
  const [MATERIA_ID, setMATERIA_ID] = React.useState([]);
  //let get_materia_id;

  const buscarTema = async materiaid => {//inicio selec materia en la vista
    //obtener datos para la consulta de unidades actuales y antes delcieere actual
    idDocenteActual = dataMateria[0].id_docente;
    idMateriaActual = materiaid.target.value;
    periodoActual = 7;
    cierreActual = fecha1; //esta variable vendra de la db el cierre de acta
    //fecha1.setMonth(fecha1.getMonth() - 3);
    setMATERIA_ID(idMateriaActual);//actualizar al estado
    let fecha_resta_acta = moment(fecha1).subtract(2, 'months');
    let getFecha_resta = moment(fecha_resta_acta).format("YYYY-MM-DD");

    await getTemas(idDocenteActual, idMateriaActual, periodoActual, cierreActual);
    setListas(datalista)//actualiza el la lista de materias actual

    console.log("<<<<")
    console.log(datalista)
    console.log(idMateriaActual + ' _actual id')

  };//fin



  const [calificaciones, setcalificaciones] = React.useState({ datalistaAlumnos });

  const obtenerTema = async (tem) => {//inico
    let numTemas = tem.target.value;
    //buscar lista alumnos  idMateria, idDocente
    await getAlumnos(MATERIA_ID, numTemas);//LISTA DE ALUMNOS  Pendiene mandar unidad que es el tema #
    await setcalificaciones({ datalistaAlumnos: datalistaAlumnos });
    await getCriterios(PERIODO_ACTUAL, MATERIA_ID, numTemas);// LISTA DE CRITERIO
    //await setCRITERIOS(dataCriterios);

    ccx1 = dataCriterios[0].porcentageC1;
    ccx2 = dataCriterios[0].porcentageC2;
    ccx3 = dataCriterios[0].porcentageC3;

    unidadCalificacion = dataCriterios[0].numUnidad;//public unidad del criterio seleccinado
    id_criterios = dataCriterios[0].idcat_Unidad;//public id_criterios del criterio seleccinado

    console.log(dataCriterios)
    document.getElementById('porcentajeC1').value = ccx1; //actualizar los campos c1, c2, c3
    document.getElementById('porcentajeC2').value = ccx2;
    document.getElementById('porcentajeC3').value = ccx3;

  }//fin


  const guardarPromedio = async (datos) => {//inicio  enviar el promedio asignado en la tabla captura_calificacion
    
    let bandera = datos.materiaDocente_id;
    let idcalificacion = datos.idcalificaciones;

    if (bandera) {
      console.log("Actualizar datos del alumno....");

      if (datos.calR2 === null && datos.calR3 === null) {
          console.log("inicializar en cero r2 y r3");
          datos.calR2 = 0;
          datos.calR3 = 0;
      } else if (datos.calR3 === null) {
                   console.log("inicializar en cero r3");
                  datos.calR3 = 0;
      }

      await updateCalificaion(idcalificacion, datos)

    } else {

        console.log("crear registro para el alumno en registro calificacion")
          await crearCalificacion(datos, unidadCalificacion, id_criterios);
      //actualizar data alumnos ##  materia_Tema  PERIODO_ACTUAL
          await getAlumnos(MATERIA_ID, unidadCalificacion);//LISTA DE ALUMNOS
          await setcalificaciones({ datalistaAlumnos: datalistaAlumnos });
    }
    console.log(datos)

  }//fin


  /*const manejador = (cc1, cc2, cc3) => {//creador de table
    console.log("imprimiendo....." + tema1X)
    console.log("datos new....." + cc1 + cc2 + cc3)
  };*/

  const [ac, setAc] = React.useState('none');//guardar porcentaje #########

  const [alumnos, setAlumnos] = React.useState({// datos de la tabla calificacion

    columns: [
      { title: 'Nª', field: 'id', editable: 'never' },
      { title: 'Control', field: 'control', editable: 'never' },
      { title: 'Nombre', field: 'nameAlumno', editable: 'never' },
      { title: 'Curso', field: 'curso', editable: 'never' },
      { title: 'Opcion', field: 'opcion', editable: 'never' },
      { title: 'C1', field: 'calR1', },
      { title: 'C2', field: 'calR2', },
      { title: 'C3', field: 'calR3', },
      { title: '#', field: '#', minWidth: 5, editable: 'never' },
      { title: <input className="inputTemas" type="number" id="porcentajeC1" placeholder="C1" style={{ width: '4ch' }} onChange={guardarPorcentaje_c1} ></input>, field: 'calCriterio1', editable: 'never', minWidth: 10 },
      { title: <input className="inputTemas" id="porcentajeC2" placeholder="C2" style={{ width: '4ch' }} onChange={guardarPorcentaje_c2} ></input>, field: 'calCriterio2', editable: 'never', minWidth: 10 },
      { title: <input className="inputTemas" id="porcentajeC3" placeholder="C3" style={{ width: '4ch' }} onChange={guardarPorcentaje_c3}  ></input>, field: 'calCriterio3', editable: 'never' },
      { title: 'Total', field: 'calificaciontotal', editable: 'never' },
    ]
  })

  //

  return (
    <div>
     
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3 >INSTITUTO TECNOLOGICO SUPERIOR DE LOS RIOS</h3>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.paperperiodos}>PERIODO: {dataMateria[0].idnomenclaturaPeriodo}</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.paperperiodos}>CIERRE DE ACTA: {fecha1}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} >
            <Chip size="small" avatar={<Avatar>80</Avatar>} label="Resumen y tareas" color="secondary"/>
            <Chip size="small" avatar={<Avatar>10</Avatar>} label="Exposicon" color="secondary"/>
            <Chip size="small" avatar={<Avatar>10</Avatar>} label="Trabajo final" color="secondary"/>
          
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.papermaterias}>
            <FormControl variant="outlined" className={estilos.formControl}>
              <InputLabel id="InputLabel">Materia</InputLabel>
              <Select
                labelId="demo-simple-select-outlined"
                id="materia"
                onChange={buscarTema}
                label="Materia"
              >
                {
                  dataMateria.map((materias) => (<MenuItem key={materias.nm} value={materias.idMateria} >{materias.nombre + ' (' + materias.semestre + "/" + materias.nomenclatura + ") " + materias.nombreCorto}</MenuItem>))
                }
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.papermaterias}>
            <FormControl variant="outlined" className={estilos.formControl}>
              <InputLabel id="demo-simple-select-outlined-labe">Unidad</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-labe"
                id="unidad"
                label="Unidad"
                onChange={obtenerTema}
              >
                {
                  listasTemas.map((tem, i) => (<MenuItem key={i} value={tem.numUnidad}>{tem.tema}</MenuItem>))

                }
              </Select>
            </FormControl>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>

        </Grid>


        <Grid item xs={12} sm={12}>

          {/*   <Paper > <Paper className={classes.root}>
    <TableContainer className={classes.container}>*/}
          <Paper elevation={3} >

            <MaterialTable
              title="Captura de calificaciones"
              columns={alumnos.columns}//columnas
              data={calificaciones.datalistaAlumnos}//filas

              /*   actions={[
                   {
                     icon: 'save',
                     tooltip: 'Save User',
                     onClick: (event, rowData) => alert("You saved " + rowData.control + " c1=" + rowData.calR1)
                   }
                 ]}*/

              editable={
                {
                  // filsa: rowData => rowData.id === '1',
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          //actualizacion del estado
                          setcalificaciones(prevState => {
                            const datalistaAlumnos = [...prevState.datalistaAlumnos];//obtenr data
                            //console.log(newData.nombre = 'sam')//estado fila modificado
                            console.log(newData.calCriterio1 = (newData.calR1 * (ccx1 / 100)))
                            console.log(newData.calCriterio2 = (newData.calR2 * (ccx2 / 100)))
                            console.log(newData.calCriterio3 = (newData.calR3 * (ccx3 / 100)))
                            console.log(newData.calificaciontotal = (parseInt(newData.calCriterio1) + parseInt(newData.calCriterio2) + parseInt(newData.calCriterio3)))
                            console.log(newData)//estado fila modificado
                            datalistaAlumnos[datalistaAlumnos.indexOf(oldData)] = newData;
                            // manejador(newData.c1, newData.c2, newData.c3)
                            guardarPromedio(newData)
                            return { ...prevState, datalistaAlumnos };
                          });
                        }
                      }, 600);
                    }),
                }
              }
              options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                }
              }}
            />

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >*O: Ordinario   *1:Primera oportunidad   *NA: No Alcanza</Paper>
          <Paper >*R: Repeticion   *2:Segunda oportunidad</Paper>
          <Paper >*E: Especial</Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
          >
            Descargar Reporte de Calificaciones
          </Button>

        </Grid>
      </Grid>
    </div>

  );
}


const guardarPorcentaje_c1 = async () => {//inicio
  var input = document.getElementById('porcentajeC1');
  input.addEventListener('input', function () {
    if (this.value.length > 2)
      this.value = this.value.slice(0, 2);
  })
  if (input.value <= 100) {
    if (input.value.length === 2) {

      //ejecutar metodo de guardar
      swal("describa el nombre del creterio:", {
        content: "input",
      })
        .then((comentario) => {
          if (comentario) {
            //enviar porcentage y comentario
            enviarCriteriosc1(input.value, comentario);
            getAlumnos(idMateriaActual,unidadCalificacion);//LISTA DE ALUMNOS
            console.log(input.value)
          } else {
            console.log(input.value + "noupede estar vacio " + comentario)
          }
          //swal(`You typed: ${comentario}`);
        });
    }
  } else {
    alert("no puede exeder de 100 %")
  }
}//fin


const guardarPorcentaje_c2 = (e) => {//inicio

  var input2 = document.getElementById('porcentajeC2');//inicio 1
  input2.addEventListener('input', function () {
    if (this.value.length > 2)
      this.value = this.value.slice(0, 2);
  })

  if (input2.value <= 100) {
    if (input2.value.length === 2) {

      //ejecutar metodo de guardar
      swal("describa el nombre del creterio:", {
        content: "input",
      })
        .then((comentario) => {

          if (comentario) {
            //enviar porcentage y comentario
            enviarCriteriosc2(input2.value, comentario)
            getAlumnos(idMateriaActual,unidadCalificacion);//LISTA DE ALUMNOS

            console.log(input2.value)
          } else {
            console.log(input2.value + "noupede estar vacio " + comentario)
          }
          //swal(`You typed: ${comentario}`);
        });

      console.log("ejecutar metodo de guardar 1")

    }

  } else {
    alert("no puede exeder de 100 %")
  }

}//fin



const guardarPorcentaje_c3 = (e) => {//inicio

  var input3 = document.getElementById('porcentajeC3');//inicio 1
  input3.addEventListener('input', function () {
    if (this.value.length > 2)
      this.value = this.value.slice(0, 2);
  })

  if (input3.value <= 100) {
    if (input3.value.length === 2) {
      //ejecutar metodo de guardar
      swal("describa el nombre del creterio:", {
        content: "input",
      })
        .then((comentario) => {

          if (comentario) {
            //enviar porcentage y comentario
            enviarCriteriosc3(input3.value, comentario)
            console.log(input3.value)
          } else {
            console.log(input3.value + "noupede estar vacio " + comentario)
          }
          //swal(`You typed: ${comentario}`);
        });

      console.log("ejecutar metodo de guardar 1")
    }
  } else {
    alert("no puede exeder de 100 %")
  }

}//fin










export default MaterialTableDemo;