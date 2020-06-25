import React from 'react';
import MaterialTable from 'material-table';
import MenuCreterios from './establecerCriterios';
import *as toastr from 'toastr';
import { crearCalificacion, updateCalificaion, getAlumnos, datalistaAlumnos } from '../../servicios/api';
import './calificaciones.css';
import { id_criterios, unidadCalificacion } from './select_temas';



export const TablaCapturaCalificaciones = React.memo((datas) => {
  const [open, setOpen] = React.useState(false);

  console.log('memo Tabla registro ')
  const { alumnos, setcalificaciones, calificaciones, ccx1, ccx2, ccx3, ccx4 } = datas;

  const guardarPromedio = async (datos) => {//inicio  enviar el promedio asignado en la tabla captura_calificacion

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

  const handleClickOpen = () => {
    if(datas.unidad){
      setOpen(true);

    }else{
      toastr.info('Seleccione una Materia y un Tema', 'Nota');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div style={{maxWidth:'100%'}}>
      <MenuCreterios handleClose={handleClose} open={open} updates={datas.updates} />
    <MaterialTable  margin="none" size="small"
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
                   // console.log(ccx1)
                   // console.log('ccx1*')

                    console.log(newData.calCriterio1 = (Math.round(parseInt(newData.calR1 || 0) * (ccx1 / 100))))
                    console.log(newData.calCriterio2 = (Math.round(parseInt(newData.calR2 || 0) * (ccx2 / 100))))
                    console.log(newData.calCriterio3 = (Math.round(parseInt(newData.calR3 || 0) * (ccx3 / 100))))
                    console.log(newData.calCriterio4 = (Math.round(parseInt(newData.calR4 || 0) * (ccx4 / 100))))
                    console.log(newData.calificaciontotal = (parseInt(newData.calCriterio1) + parseInt(newData.calCriterio2) + parseInt(newData.calCriterio3) + parseInt(newData.calCriterio4)))
                    //console.log(newData)//estado fila modificado
                    guardarPromedio(newData)
                    datalistaAlumnos[datalistaAlumnos.indexOf(oldData)] = newData;
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
      }} 
      actions={[
        {
          icon: 'library_books',
          tooltip: 'Editar criterios',
          isFreeAction: true,
          onClick: (event) => handleClickOpen()
        }
      ]}
      />
      </div>
  );
})