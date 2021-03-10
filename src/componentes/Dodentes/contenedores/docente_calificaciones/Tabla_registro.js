import React, {useContext} from 'react';
import MaterialTable from 'material-table';
import MenuCreterios from './establecerCriterios';
import * as toastr from 'toastr';
import {crearCalificacion, updateCalificaion, getAlumnos, datalistaAlumnos} from '../../../servicios/api';
import './calificaciones.css';
import {id_criterios, unidadCalificacion} from './select_temas';
import {PeriodoMateriasContext} from "../../../../Context/PeriodoMateria/ContextPeriodosMateria";

export const TablaCapturaCalificaciones = (datas) => {
    const [statePeriodoMateria] = useContext(PeriodoMateriasContext);
    const [open, setOpen] = React.useState(false);
    const [isLoader,setLoader] = React.useState(false);
    const {alumnos, setcalificaciones, calificaciones, ccx1, ccx2, ccx3, ccx4, MateriaDocente, group} = datas;


    const guardarPromedio = async (datos) => {
        //inicio  enviar el promedio asignado en la tabla captura_calificacion
        try {
            let bandera = datos.materiaDocente_id;
            let idcalificacion = datos.idcalificaciones;
            let idFolioAlumno = datos.FolioAcade;

            if (Boolean(bandera)) {
                if (datos.calR1 === null && datos.calR2 === null && datos.calR3 === null && datos.calR4 === null) {
                    datos.calR1 = 0;
                    datos.calR2 = 0;
                    datos.calR3 = 0;
                    datos.calR4 = 0;
                } else if (datos.calR2 === null && datos.calR3 === null && datos.calR4 === null) {
                    datos.calR2 = 0;
                    datos.calR3 = 0;
                    datos.calR4 = 0;
                } else if (datos.calR3 === null && datos.calR4 === null) {
                    datos.calR3 = 0;
                    datos.calR4 = 0;
                } else if (datos.calR4 === null) {
                    datos.calR4 = 0;
                }
                await updateCalificaion(idcalificacion, datos);
            } else if (Boolean(bandera) === false) {
                //crear registro para el alumno en registro calificacion
                await crearCalificacion(datos, unidadCalificacion, id_criterios);
                await getAlumnos(datos.idMateria, unidadCalificacion, group, MateriaDocente, statePeriodoMateria?.data[0].periodo); //LISTA DE ALUMNOS
                await setcalificaciones({datalistaAlumnos: datalistaAlumnos});
                let searchId = await datalistaAlumnos.filter(item => item.FolioAcade === idFolioAlumno)
                if (searchId.length){
                   return {
                      idMateriaDocenteId:searchId[0].materiaDocente_id,
                       idCalificacionRegistro:searchId[0].idcalificaciones,
                    }
                }
            }
        } catch (e) {
            alert("El proceso no pudo ser completado.")
        }

    }; //fin

    const handleClickOpen = () => {
        if (datas.unidad) {
            setOpen(true);
        } else {
            toastr.info('Seleccione una Materia y un Tema', 'Nota');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    //<div class="loader"></div>

    return (
        <div id="calificacion" style={{maxWidth: '100%'}}>

            <MenuCreterios handleClose={handleClose} open={open} updates={datas.updates}/>
            <MaterialTable
                margin="none"
                size="small"
                title="Captura de calificaciones"
                columns={alumnos.columns} //columnas
                data={calificaciones.datalistaAlumnos} //filas
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setLoader(true)
                            async function updatePromedios() {
                                if (oldData) {
                                    const updataCalificacion = [...calificaciones.datalistaAlumnos];
                                    const index = oldData.tableData.id;
                                    newData.calCriterio1 = parseFloat(newData.calR1 || 0) * (ccx1 / 100)
                                    newData.calCriterio2 = parseFloat(newData.calR2 || 0) * (ccx2 / 100)
                                    newData.calCriterio3 = parseFloat(newData.calR3 || 0) * (ccx3 / 100)
                                    newData.calCriterio4 = parseFloat(newData.calR4 || 0) * (ccx4 / 100)
                                    newData.calificaciontotal = Math.round(
                                        parseFloat(newData.calCriterio1) +
                                        parseFloat(newData.calCriterio2) +
                                        parseFloat(newData.calCriterio3) +
                                        parseFloat(newData.calCriterio4))
                                    //console.log(newData,"ver el estado de la inf")
                                    // estado fila modificado
                                   let idMaterias = await guardarPromedio(newData);
                                    //numero.toFixed();
                                    if (Boolean(idMaterias)){
                                        newData.materiaDocente_id = idMaterias.idMateriaDocenteId;
                                        newData.idcalificaciones = idMaterias.idCalificacionRegistro;
                                    }
                                    newData.calCriterio1 = newData.calCriterio1.toFixed();
                                    newData.calCriterio2 = newData.calCriterio2.toFixed();
                                    newData.calCriterio3 = newData.calCriterio3.toFixed();
                                    newData.calCriterio4 = newData.calCriterio4.toFixed();

                                    updataCalificacion[index] = newData;
                                    await setcalificaciones({
                                        ...calificaciones.datalistaAlumnos,
                                        datalistaAlumnos: updataCalificacion
                                    });

                                }
                            }//fin

                            updatePromedios()
                                .then((res) => console.log('res', res))
                                .catch((e) => console.log(e))
                                .finally(() => {
                                    resolve()
                                    setLoader(false)
                                })
                        })
                }}
                isLoading={isLoader}
                options={{
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF',
                        size: 'small'
                    },
                    rowStyle: {
                        white: 'pre'
                    }
                }}
                actions={[
                    {
                        icon: 'library_books',
                        tooltip: 'Editar criterios',
                        isFreeAction: true,
                        onClick: (event) => handleClickOpen()
                    }
                ]}
                localization={{
                    pagination: {labelRowsSelect: "filas", labelDisplayedRows: "{from}-{to} de {count}"},
                    body: {
                        editTooltip: "Agregar calificaciones",
                        editRow: {saveTooltip: "Guardar", cancelTooltip: "Cancelar"},
                        emptyDataSourceMessage: "Seleccione algún tema primero."
                    },
                    toolbar: {searchPlaceholder: "Buscar alumno"}
                }}
            />
        </div>
    );
};
