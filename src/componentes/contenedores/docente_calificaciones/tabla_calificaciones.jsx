import React, {useEffect, useRef, useCallback, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';

import './calificaciones.css';
import { useStyles } from './dialogos_calificacion';
import { getAdmiFechas } from '../../servicios/api';
import { datalistaAlumnos, getCriterios, dataCriterios, } from '../../servicios/api';
import { dataFechasCierre,FECHA_ACTUAL } from '../../servicios/api';
import { SelecMaterias } from './select_materia';
import { SelectTemas } from './select_temas';
import { TablaCapturaCalificaciones } from './Tabla_registro';
import {ReportParciales} from './reportes/parciales/parciales';
import {ActaFinal} from './reportes/actaFinal/acta';
import {PeriodoMateriasContext} from "../../Context/PeriodoMateria/ContextPeriodosMateria";
//import {MateriasContext} from "../../Context/ListaMateriaDocente/ContextMaterias";
//export var unidad_Tema;
//unidadCalificacion, id_criterios
var ccx1 = 0, ccx2 = 0, ccx3 = 0, ccx4 = 0;
 //var crt1 = 'Criterio 1', crt2 = 'Criterio 2', crt3 = 'Criterio 3', crt4 = 'Criterio 4';




const funtions = new Set();


export const MaterialTableDemo = () => {//inicio del componente
  const [statePeriodoMateria] = useContext(PeriodoMateriasContext);
  //const {stateMateria ,setStateMateria} =useContext(MateriasContext);

  const estilos = useStyles();
  const [open, setOpen] = React.useState(false);
  const [calificaciones, setcalificaciones] = React.useState({ datalistaAlumnos });
  const [listasTemas, setListas] = React.useState([]);
  const [MATERIA_ID, setMATERIA_ID] = React.useState([]);
  const [MateriaDocente, setMateriaDocente] = React.useState([]);

  const [unidad, setUnidad] = React.useState('');
  const [group, setGroup] = React.useState('');


  const [cierre, setCierre] = React.useState(false);
  const [minimo, setMinimo] = React.useState(false);

  const [ccx41, setCcx4] = React.useState(0);
  const [ccx31, setCcx3] = React.useState(0);
  const [ccx21, setCcx2] = React.useState(0);
  const [ccx11, setCcx1] = React.useState(0);

  const BC1 = useRef();
  const BC2 = useRef();
  const BC3 = useRef();
  const BC4 = useRef();
  //moment(new Date('2020-03-31')).format('YYYY-MM-DD'); fecha para las pruebas de cierre de acta
  //let get_materia_id; 
  const fecha_actual = moment(new Date(FECHA_ACTUAL)).format('YYYY-MM-DD'); // aca esta la fecha en tiempo real


  useEffect(() => {

    setcalificaciones({ datalistaAlumnos: [] })
    BC1.current.style.display = 'none'
    BC2.current.style.display = 'none'
    BC3.current.style.display = 'none'
    BC4.current.style.display = 'none'

    // document.getElementById('porcentajeC1').disabled = true;
    async function fechasGet() {//establese el cieere de acta de acuerdo la fecha actual
      try {
        if (dataFechasCierre.length === 0) {
          await getAdmiFechas(statePeriodoMateria?.data[0].periodo)
        }

        var primera = moment(dataFechasCierre[0].primera_entrega).format('YYYY-MM-DD');
        var segunda = moment(dataFechasCierre[0].segunda_entrega).format('YYYY-MM-DD'); //entrega_final
        var tercera = moment(dataFechasCierre[0].tercera_entrega).format('YYYY-MM-DD');
        var entrega_final = moment(dataFechasCierre[0].entrega_final).format('YYYY-MM-DD');
        var habilitar_todas=dataFechasCierre[0].habilitar_todas;


        if (fecha_actual <= primera && habilitar_todas===0) {
          let rest = moment(fecha_actual).subtract(2, 'month'); //rango de la fechas de busqueda
          setCierre(primera)
          setMinimo(moment(rest).format('YYYY-MM-DD'))
        } else if (fecha_actual <= segunda  && habilitar_todas===0) {
          setCierre(segunda)
          setMinimo(primera)
        } else if (fecha_actual <= tercera  && habilitar_todas===0) {
          setCierre(tercera)
          setMinimo(segunda)
        } else if(fecha_actual <= entrega_final  && habilitar_todas===0){
          setCierre(entrega_final)
          setMinimo(tercera)
        }else if(habilitar_todas===1){
          let rest = moment(primera).subtract(3, 'month');
          setCierre(entrega_final)
          setMinimo(moment(rest).format('YYYY-MM-DD'))
        }else{
          alert("Sin fechas de cierre definidas por el momento ")
        }
      } catch (error) {
        //pendiente
      }
    }

    fechasGet()

  }, []);

  useEffect(() => {
    ccx1=0
    ccx2=0
    ccx3=0
    ccx4=0
    setCcx4(0)
    setCcx3(0)
    setCcx2(0)
    setCcx1(0)
    BC1.current.value = 0
    BC2.current.value = 0
    BC3.current.value = 0
    BC4.current.value = 0
  },[MATERIA_ID])


  const updates = useCallback(async (m, u,idMateria_docente) => {//actualiza los griterios despues de incertar en la db m:materia u:unidad
    try {
      await getCriterios(m, u,idMateria_docente,statePeriodoMateria?.data[0].periodo);// LISTA DE CRITERIO getTem
      await Promise.all([
      ccx1 = dataCriterios[0].porcentageC1,
      ccx2 = dataCriterios[0].porcentageC2,
      ccx3 = dataCriterios[0].porcentageC3,
      ccx4 = dataCriterios[0].porcentageC4,
     ]);
    setCcx4(ccx4)
    setCcx3(ccx3)
    setCcx2(ccx2)
    setCcx1(ccx1)

    BC1.current.value = ccx1
    BC2.current.value = ccx2
    BC3.current.value = ccx3
    BC4.current.value = ccx4

    BC1.current.style.display = 'block'
    BC2.current.style.display = 'block'
    BC3.current.style.display = 'block'
    BC4.current.style.display = 'block'

    return true
    } catch (error) {
      console.log(error)
    }
    
  }, [])


  funtions.add(updates)


  const [alumnos, setAlumnos] = React.useState({// datos de la tabla calificacion
    columns: [
      //{ title: 'Nª', field: 'nma', editable: 'never', defaultSort: 'asc' },
      {
        title: 'Control', field: 'control', editable: 'never', disablePadding: true, minWidth: 10,sorting:false ,
        cellStyle: {  textAlign: "left", paddingTop: 2, paddingBottom: 0 }

      },
      { title: 'Nombre', field: 'nameAlumno', editable: 'never', defaultSort: 'asc' },
      { title: 'Curso', field: 'curso', editable: 'never', disablePadding: true, minWidth: 10,sorting:false },
      { title: 'Opcion', field: 'opcion', disablePadding: true, minWidth: 10, lookup: { 1:'1RA', 2: '2DA' },sorting:false },
      { title: 'C1', field: 'calR1' , editComponent: props => (
        <input
        className="size_input"
        disabled={BC1.current.value > 0 ? false:true}
          type="number"
          value={props.value}
          onChange={e => props.onChange(e.target.value = Math.max(0, Math.min(parseInt(e.target.value || 0),100)).toString().slice(0, 3))}
          min='0'
        />), sorting:false },

      { title: 'C2', field: 'calR2', editComponent: props => (
        <input
        className="size_input"
        disabled={BC2.current.value > 0 ? false:true}
          type="number"
          value={props.value}
          onChange={e => props.onChange(e.target.value = Math.max(0, Math.min(parseInt(e.target.value || 0),100)).toString().slice(0, 3))}
          min='0'
        />),sorting:false },

      { title: 'C3', field: 'calR3',
      editComponent: props => (
        <input
        className="size_input"
        disabled={BC3.current.value > 0 ? false:true}
          type="number"
          value={props.value}
          onChange={e => props.onChange(e.target.value = Math.max(0, Math.min(parseInt(e.target.value || 0),100)).toString().slice(0, 3))}
          min='0'
        />
      ), sorting:false },

      { title: 'C4', field: 'calR4',editComponent: props => (
        <input
        className="size_input"
        disabled={BC4.current.value > 0 ? false:true}
          type="number"
          value={props.value}
          onChange={e => props.onChange(e.target.value = Math.max(0, Math.min(parseInt(e.target.value || 0),100)).toString().slice(0, 3))}
          min='0'
        />), sorting:false },

      { title: '#', field: '#', editable: 'never', size: 'small', disablePadding: true,sorting:false },
      { title: <input className="inputTemas" id="porcentajeC1" placeholder="C1" style={{ width: '4ch' }} ref={BC1} disabled ></input>, field: 'calCriterio1', editable: 'never', minWidth: 10, disablePadding: true,sorting:false },
      { title: <input className="inputTemas" id="porcentajeC2" placeholder="C2" style={{ width: '4ch' }} ref={BC2} disabled ></input>, field: 'calCriterio2', editable: 'never', minWidth: 10, disablePadding: true,sorting:false },
      { title: <input className="inputTemas" id="porcentajeC3" placeholder="C3" style={{ width: '4ch' }} ref={BC3} disabled ></input>, field: 'calCriterio3', editable: 'never', disablePadding: true,sorting:false },
      { title: <input className="inputTemas" id="porcentajeC4" placeholder="C4" style={{ width: '4ch' }} ref={BC4} disabled ></input>, field: 'calCriterio4', editable: 'never', disablePadding: true,sorting:false },
      { title: 'Total', field: 'calificaciontotal', editable: 'never', disablePadding: true, sorting:false }
    ]
  })

  //

  return (
    <div>
      <Backdrop className={estilos.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3 style={{textAlign:'center'}}>INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS</h3>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.paperperiodos}><strong>PERIODO:</strong>{`${statePeriodoMateria.data[0].rango}-${statePeriodoMateria.data[0].anio}`}</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.paperperiodos}><strong>CIERRE DE ACTA: </strong>{moment(cierre).format('DD-MM-YYYY')}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={estilos.paperAvatar} elevation={0} >
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.papermaterias}>
            <SelecMaterias setListas={setListas} setcalificaciones={setcalificaciones}
              setMATERIA_ID={setMATERIA_ID} minimo={minimo} cierre={cierre} setGroup={setGroup} setMateriaDocente={setMateriaDocente}/>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.papermaterias}>

            <SelectTemas setcalificaciones={setcalificaciones}
              updates={updates} listasTemas={listasTemas}
              setUnidad={setUnidad}
              unidad={unidad}
              setOpen={setOpen}
              MATERIA_ID={MATERIA_ID}
              MateriaDocente={MateriaDocente}
              group={group} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper elevation={3} >
            <TablaCapturaCalificaciones
              alumnos={alumnos} setcalificaciones={setcalificaciones} calificaciones={calificaciones}
              ccx1={ccx11} ccx2={ccx21} ccx3={ccx31} ccx4={ccx41} updates={updates} unidad={unidad} MateriaDocente={MateriaDocente} group={group}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >*O: Ordinario   *1:Primera oportunidad   *NA: No Alcanza</Paper>
          <Paper >*R: Repeticion   *2:Segunda oportunidad</Paper>
          <Paper >*E: Especial</Paper>
        </Grid>
        <Grid item xs={12}>
          <div style={{display:'inline-flex'}}>
        <ReportParciales/>
        <ActaFinal/>
        </div>
        </Grid>
      </Grid>
    </div>
  );
}



export default React.memo(MaterialTableDemo);
