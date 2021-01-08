import React, {useMemo} from "react";
import ListDocentes from "./ListDocentes";
import Periodos from "../../Periodos";
import MaterialTablesReprobacionDocente from "./ReprobacionTable";
import axios from 'axios';

const TablaReprobacionDocente =()=>{
    const [idPersonal, setIdPersonal] = React.useState<any>(0);
    const [infoTeacher, setInfoTeacher] = React.useState<any>([]);
    const [listaPeriodo,setListaPeriodo] = React.useState('');
    const [dataAlumnos,setDataAlumnos]=React.useState([]);


    useMemo(()=>{
        if (listaPeriodo && idPersonal?.value){
            axios.get('/api/reporte/consultar/list-reprobacion-docente',{
                params:{
                    idpersonal:idPersonal?.value,
                    periodo:listaPeriodo
                }
            })
                .then((res=>{
                    setDataAlumnos(res.data)
                }))
                .catch((error)=>console.log(error))
        }

    },[listaPeriodo,idPersonal])

    return(<div>
<div style={{display:'flex',justifyContent:'space-around',maxWidth:'820px',minWidth:'820px',marginBottom: '85px'}}>
        <div style={{width:'190px'}}>
            <ListDocentes
                setIdPersonal={setIdPersonal}
                idPersonal={idPersonal}
                setInfoTeacher={setInfoTeacher}
            />
        </div>
        <Periodos
            setListaPeriodo={setListaPeriodo}
            listaPeriodo={listaPeriodo}
        />
</div>
<MaterialTablesReprobacionDocente dataAlumnos={dataAlumnos}/>
    </div>)
}

export default TablaReprobacionDocente;
