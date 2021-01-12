import React, { useMemo, useState} from "react";
import axios from'axios';
import MaterialTable from "material-table";
import Periodos from "./Periodos";
import TablaReprobacionDocente from "./component/ReprobacionDocente";
import {DepartamentoReprobacion } from './component/ReprobacionDocente/ReprobacionDepartamento';
import './component/ReprobacionDocente/styles/index.css';


const ReprobacionTable =()=>{
    const [listaPeriodo,setListaPeriodo]=useState('');
    const [dataAlumnos,setAlumnos]=useState([]);
    const [loading,setLoading]=useState(false);
    useMemo(()=>{
        if(listaPeriodo){
            setLoading(true)
            axios.get('/api/reporte/consultar/statistics-approved',{
                params:{
                    periodo:listaPeriodo
                }
            }).then((res)=>{
                setAlumnos(res.data)
                setLoading(false)
            }).catch((erro)=> {
                console.log(erro)
                setLoading(false)
            })
        }
    },[listaPeriodo])


    return(<div>
        <Periodos listaPeriodo={listaPeriodo} setListaPeriodo={setListaPeriodo}/>
        <MaterialTables dataAlumnos={dataAlumnos} loading={loading}/>
    </div>)
}


function MaterialTables({dataAlumnos,loading}:any) {
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
                        textAlign: "center"
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
            isLoading={loading}
        />
    )
}

const viewComponent=(index:number)=>{
    switch (index) {
        case 0:
            return <ReprobacionTable/>
            break;
        case 1:
            return <TablaReprobacionDocente/>
        break;
        case 2:
            return <DepartamentoReprobacion/>
            break;

    }
}

const homeReprobacion=()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [optiones,setOptiones] = React.useState(0);


    return(<div>
        <section>
            <button className={"btn-reprobacion"} onClick={()=>setOptiones(0)}>Reprobación carrera</button>
            <button className={"btn-reprobacion"} onClick={()=>setOptiones(1)}>Reprobación docente</button>
            <button style={{background:'red'}}  className={"btn-reprobacion"} onClick={()=>setOptiones(2)}>Reprobación departamento</button>
        </section>
        <section>
            {viewComponent(optiones)}
        </section>
    </div>)
}


export default homeReprobacion;


