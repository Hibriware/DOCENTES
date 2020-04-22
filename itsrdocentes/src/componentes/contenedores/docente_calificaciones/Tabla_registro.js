import React from 'react';
import MaterialTable from 'material-table';


export const TablaCapturaCalificaciones = (data) => {
    const { alumnos, calificaciones, setcalificaciones, guardarPromedio, ccx1, ccx2, ccx3, ccx4 } = data;

    return (
        <MaterialTable
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
                }
            }} />
    );
}