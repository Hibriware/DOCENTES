import React from 'react';
import MaterialTable from 'material-table';
import { useStyles } from './dialogos_calificacion';
import { crearCalificacion, updateCalificaion, getAlumnos, datalistaAlumnos } from '../../servicios/api';
import './calificaciones.css';
import { id_criterios, unidadCalificacion } from './select_temas';
import { withStyles } from '@material-ui/core/styles';


const StyledMaterialTable = withStyles({
 
  'MuiTableCell-root': {
    padding:'2px',
  }

})(MaterialTable);



export const TablaCapturaCalificaciones = React.memo((data) => {
  console.log('memo Tabla registro ')
  const estilos = useStyles();
  const { alumnos, setcalificaciones, calificaciones, ccx1, ccx2, ccx3, ccx4 } = data;

  const guardarPromedio = async (datos) => {//inicio  enviar el promedio asignado en la tabla captura_calificacion

    console.log('hook guardarPromedio >> ' + datos.idMateria)
    console.log(datos)

    let bandera = datos.materiaDocente_id;
    let idcalificacion = datos.idcalificaciones;

    if (bandera) {
      if(datos.calR1 === null && datos.calR2 === null && datos.calR3 === null && datos.calR4 === null){
        datos.calR1 = 0;
        datos.calR2 = 0;
        datos.calR3 = 0;
        datos.calR4 = 0;
      }
      else if (datos.calR2 === null && datos.calR3 === null && datos.calR4 === null) {
        datos.calR2 = 0;
        datos.calR3 = 0;
        datos.calR4 = 0;
      } else if (datos.calR3 === null && datos.calR4 === null) {
        datos.calR3 = 0;
        datos.calR4 = 0;
      } else if (datos.calR4 === null) {
        datos.calR4 = 0;
      }
      await updateCalificaion(idcalificacion, datos)
    } else {//crear registro para el alumno en registro calificacion
      console.log('unidadCalificacion  v')

      console.log(unidadCalificacion)
      await crearCalificacion(datos, unidadCalificacion, id_criterios);
      await getAlumnos(datos.idMateria, unidadCalificacion);//LISTA DE ALUMNOS
      await setcalificaciones({ datalistaAlumnos: datalistaAlumnos });
    }
  }//fin


  return (
    <div style={{maxWidth:'100%'}}>
    <StyledMaterialTable  cellpadding="0" cellspacing="0"
      id="mytable"
      estilos={{ td: estilos.td }}
      title="Captura de calificaciones"
      columns={alumnos.columns}//columnas
      data={calificaciones.datalistaAlumnos}//filas
      editable={
        {
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setcalificaciones(prevState => {
                    const datalistaAlumnos = [...prevState.datalistaAlumnos];//obtenr data
                    console.log(newData.calCriterio1 = (newData.calR1 * (ccx1 / 100)))
                    console.log(newData.calCriterio2 = (newData.calR2 * (ccx2 / 100)))
                    console.log(newData.calCriterio3 = (newData.calR3 * (ccx3 / 100)))
                    console.log(newData.calCriterio4 = (newData.calR4 * (ccx4 / 100)))
                    console.log(newData.calificaciontotal = (parseInt(newData.calCriterio1) + parseInt(newData.calCriterio2) + parseInt(newData.calCriterio3) + parseInt(newData.calCriterio4)))
                    console.log(newData)//estado fila modificado
                    datalistaAlumnos[datalistaAlumnos.indexOf(oldData)] = newData;
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
          color: '#FFF',
          size: 'small'
        },
        rowStyle: {
          white: 'pre',
        },
      }} />
      </div>
  );
})