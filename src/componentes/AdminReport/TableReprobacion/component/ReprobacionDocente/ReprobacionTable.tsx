import MaterialTable from "material-table";
import React from "react";
/*
*  {
        "materia": "TALLER DE ETICA",
        "grupo": "B 1/Lic. Admon.",
        "reprobadosHombres": 3,
        "reprobadosMujeres": 3,
        "totalReprobadosMH": 6,
        "aprobadosHombres": 14,
        "aprobadosMujeres": 10,
        "totalAprobadosMH": 24,
        "totalMujeres": 13,
        "totalHombre": 17,
        "totalHM": 30,
        "reprobacion": 20,
        "aprobacion": 80
    }
* */

function MaterialTablesReprobacionDocente({dataAlumnos}:any) {
    return (
        <MaterialTable
            title="ALUMNOS REPROBADOS POR MATERIA"
            columns={[
                {
                    title: 'Materia', field: 'materia',
                    cellStyle: {
                        backgroundColor: '#039be5',
                        color: '#FFF',
                    },
                    headerStyle: {
                        backgroundColor: '#039be5',
                        paddingTop: 2, paddingBottom: 0
                    }
                },
                { title: 'Grup.', field: 'grupo' ,sorting:false,
                    cellStyle: {
                        backgroundColor: '#039be5',
                        color: '#FFF',
                    },
                    headerStyle: {
                        backgroundColor: '#039be5',
                        paddingTop: 2, paddingBottom: 0
                    }},
                { title: 'Rep.Hom.', field: 'reprobadosHombres', type: 'numeric' ,
                    cellStyle: {
                        backgroundColor: '#ee9797',
                        color: '#ffffff',
                        textAlign: "center"
                    },  headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                {
                    title: 'Rep.Muj.',
                    field: 'reprobadosMujeres',
                    cellStyle: {
                        backgroundColor: '#ee9797',
                        color: '#ffffff',
                        textAlign: "center"
                    },  headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }
                },
                { title: 'Rep.Tot.', field: 'totalReprobadosMH', type: 'numeric',
                    cellStyle: {textAlign: "center",
                        backgroundColor: '#ee9797',
                        color: '#ffffff',},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'Apr.Hom.', field: 'aprobadosHombres', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'Apr.Muj', field: 'aprobadosMujeres', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'Apr. Tot.', field: 'totalAprobadosMH', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'Tot. Hom.', field: 'totalHombre', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'Tot. Muj.', field: 'totalMujeres', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'Tot. Hom.', field: 'totalHombre', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: '%Rep.', field: 'reprobacion', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: '%Apr.', field: 'aprobacion', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }}
            ]}
            data={dataAlumnos}
            options={{
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                },
                exportButton:true
                ,
                search:false,
                sorting:false,
                //exportDelimiter:"; "
            }}
            localization={{
                pagination:{labelRowsSelect:"filas",labelDisplayedRows:"{from}-{to} de {count}"},
                body:{emptyDataSourceMessage:"Seleccione algún periodo"},
            }}
        />
    )
}

export default MaterialTablesReprobacionDocente;
