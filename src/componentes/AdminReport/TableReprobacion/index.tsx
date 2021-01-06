import React, {useEffect, useMemo, useState} from "react";
import axios from'axios';
import MaterialTable from "material-table";
import Periodos from "./Periodos";

const ReprobacionTable =()=>{
    const [listaPeriodo,setListaPeriodo]=useState('');
    const [dataAlumnos,setAlumnos]=useState([]);
    useMemo(()=>{
        if(listaPeriodo){
            axios.get('/api/reporte/consultar/statistics-approved',{
                params:{
                    periodo:listaPeriodo
                }
            }).then((res)=>{
                setAlumnos(res.data)
            }).catch((erro)=>console.log(erro))
        }
    },[listaPeriodo])


    return(<div>
        <Periodos listaPeriodo={listaPeriodo} setListaPeriodo={setListaPeriodo}/>
        <MaterialTables dataAlumnos={dataAlumnos}/>
    </div>)
}


function MaterialTables({dataAlumnos}:any) {
    return (
        <MaterialTable
            title="ALUMNOS REPROBADOS POR CARRERA"
            columns={[
                {
                    title: 'CARRERA', field: 'carrera',
                    cellStyle: {
                        backgroundColor: '#039be5',
                        color: '#FFF',
                    },
                    headerStyle: {
                        backgroundColor: '#039be5',
                        paddingTop: 2, paddingBottom: 0
                    }
                },
                { title: 'REPROBADOS HOMBRES', field: 'RHombre' ,sorting:false,
                    cellStyle: {
                        backgroundColor: '#ee9797',
                        color: '#ffffff',
                        textAlign: "center", paddingTop: 0, paddingBottom: 0

                    },
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'REPROBADOS MUJERES', field: 'RMujeres', type: 'numeric' ,
                    cellStyle: {
                        backgroundColor: '#ee9797',
                        color: '#ffffff',
                        textAlign: "center"
                    },  headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                {
                    title: 'REPROBADOS TOTAL',
                    field: 'totalReprobados',
                    cellStyle: {
                        backgroundColor: '#ee9797',
                        color: '#ffffff',
                        textAlign: "left"
                    },  headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }
                },
                { title: 'HOMBRE', field: 'totalHombres', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'MUJERES', field: 'totalMujeres', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
                { title: 'TOTAL', field: 'totalAlumnos', type: 'numeric',
                    cellStyle: {textAlign: "center"},
                    headerStyle: {
                        paddingTop: 0, paddingBottom: 0,
                        textAlign:"center"
                    }},
            ]}
            data={dataAlumnos}
            options={{
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                },
                exportButton:true,
                search:false,
                sorting:false
            }}


        />
    )
}



export default ReprobacionTable;


