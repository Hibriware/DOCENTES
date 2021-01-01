import React from 'react';
import {
    Grid,
    Container
} from '@material-ui/core';
import ListTeacher from '../../Reportes/ListTeacher';
import ListPeriodo from '../../Reportes/Periodo';
import Subject from '../../Reportes/listSubject';
import {TablaVerTemas} from '../../contenedores/docente_calendario/tabla_lista_temas';
import {list_date,All_List_Date,getToken} from '../constants/end-points';
import Axios from 'axios';
import moment from 'moment';
import {ReportParciales} from '../reportes/parciales/parciales';
import {ActaFinal} from '../reportes/actaFinal/acta';;



interface IntePeriod{
    idnomenclaturaPeriodo:Number, 
    rango: String
}

interface InteSubject{
    asignacionGrupo_idgrupo: number,
    carrera: String,
    clave: String,
    idmaterias: number,
    materiaDocenteId: number,
    nomcorto: string
    nomenclatura:string,
    semestre: number
}

interface IntePersonal{
    label:string, 
    value: number,
}

function ListSubject() {
    const [idPersonal, setIdPersonal] = React.useState<IntePersonal>();
    const [infoTeacher, setInfoTeacher] = React.useState<any>([]);
    const [idPeriodo, setIdPeriodo] = React.useState<IntePeriod>();
    const [idMateriaD, setIdMateriaD] = React.useState<InteSubject>();

    const fecha_Defaul:any = moment(new Date()).format('DD-MM-YYYY');
	const [ fecha1, setFecha1 ] = React.useState<any>(fecha_Defaul);
	const [ fecha2, setFecha2 ] = React.useState<any>(fecha_Defaul);
	const [ fecha3, setFecha3 ] = React.useState<any>(fecha_Defaul);
    const [ fechaFinal, setFechafinal ] = React.useState<any>(fecha_Defaul);
    const [ eleccion_temas, setEleccion_temas ] = React.useState({ data: [] });
    
    

    React.useMemo(()=>{
         idPeriodo && idMateriaD && idPersonal && Axios.get(`${list_date}/${idPeriodo?.idnomenclaturaPeriodo}`,getToken()).then((res)=>{
            const[DATES]=res.data;
            setFecha1(DATES?.primera_entrega)
            setFecha2(DATES?.segunda_entrega)
            setFecha3(DATES?.tercera_entrega)
            setFechafinal(DATES?.entrega_final)
        }).catch((err)=>console.log(err))
    },[idPeriodo,idMateriaD]);

    React.useMemo(()=>{
        idPeriodo && idMateriaD && idPersonal && Axios.get(`${All_List_Date}/${idPeriodo?.idnomenclaturaPeriodo}/${idMateriaD?.idmaterias}/${idPersonal?.value}/${idMateriaD?.materiaDocenteId}`)
        .then((res)=>{
            setEleccion_temas({data:res.data})
        }).catch((err)=>console.log(err))
    },[fecha1,fecha2,idMateriaD?.materiaDocenteId,idPersonal]);


    return(
        <Container maxWidth="sm">
        <Grid container  justify="flex-end"  spacing={3}>
        <Grid item xs={12}>
        <ListTeacher 
            setIdPersonal={setIdPersonal}
            idPersonal={idPersonal}
            setInfoTeacher={setInfoTeacher}/>
        </Grid>
        <Grid item xs={6}>
            <ListPeriodo
             idPeriodo={idPeriodo} 
             setIdPeriodo={setIdPeriodo} />
        </Grid>
        <Grid item xs={6}>
            <Subject
              idPersonal={idPersonal}
              idPeriodo={idPeriodo}
              idMateriaD={idMateriaD}
              setIdMateriaD={setIdMateriaD} 
              
             />
        </Grid>
        <Grid item xs={12}>
            <TablaVerTemas
			eleccion_temas={eleccion_temas}
            fecha1={fecha1}
            fecha2={fecha2}
            fecha3={fecha3}
            fechaFinal={fechaFinal}
            />
        </Grid>
        <Grid item xs={6}>
        <ReportParciales idMateriaD={idMateriaD} idPeriodo={idPeriodo} idPersonal={idPersonal} infoTeacher={infoTeacher}/>
        </Grid>
        <Grid item xs={6}>
        <ActaFinal idMateriaD={idMateriaD} idPeriodo={idPeriodo} idPersonal={idPersonal} infoTeacher={infoTeacher} />
        </Grid>

      </Grid>
      </Container>
    )
}

export default ListSubject;
