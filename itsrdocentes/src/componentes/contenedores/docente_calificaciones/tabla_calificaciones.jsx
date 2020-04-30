import React, { useEffect, useRef, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import swal from 'sweetalert';
import './calificaciones.css';
import { useStyles } from './dialogos_calificacion';
import { dataPeriodo, getAdmiFechas } from '../../servicios/api';
import { datalistaAlumnos, getCriterios, dataCriterios, } from '../../servicios/api';
import { dataFechasCierre } from '../../servicios/api';
import { SelecMaterias } from './select_materia';
import { SelectTemas } from './select_temas';
import { ChipCriterios } from './chip_criterios';
import { TablaCapturaCalificaciones } from './Tabla_registro';
import { EnviarCriterios } from './cont_criterios';
import {ReportParciales} from './reportes/parciales/parciales';
import {ActaFinal} from './reportes/actaFinal/acta'
export var unidad_Tema;
//unidadCalificacion, id_criterios
var ccx1 = 0, ccx2 = 0, ccx3 = 0, ccx4 = 0;
export var crt1 = 'Criterio 1', crt2 = 'Criterio 2', crt3 = 'Criterio 3', crt4 = 'Criterio 4';




const funtions = new Set();


export const MaterialTableDemo = () => {//inicio del componente

  const estilos = useStyles();
  const [open, setOpen] = React.useState(false);
  const [calificaciones, setcalificaciones] = React.useState({ datalistaAlumnos });
  const [listasTemas, setListas] = React.useState([]);
  const [MATERIA_ID, setMATERIA_ID] = React.useState([]);
  const [cierre, setCierre] = React.useState(false);
  const [minimo, setMinimo] = React.useState(false);

  const [c1, setC1] = React.useState('');
  const [c2, setC2] = React.useState('');
  const [c3, setC3] = React.useState('');
  const [c4, setC4] = React.useState('');

  const BC1 = useRef();
  const BC2 = useRef();
  const BC3 = useRef();
  const BC4 = useRef();
  //moment(new Date('2020-03-31')).format('YYYY-MM-DD'); fecha para las pruebas de cierre de acta
  //let get_materia_id; 
  const fecha_actual = moment(new Date()).format('YYYY-MM-DD'); // aca esta la fecha en tiempo real


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
          console.log('iniciando la peticon de fechas')
          await getAdmiFechas()
        }

        var primera = moment(dataFechasCierre[0].primera_entrega).format('YYYY-MM-DD');
        var segunda = moment(dataFechasCierre[0].segunda_entrega).format('YYYY-MM-DD');
        var tercera = moment(dataFechasCierre[0].tercera_entrega).format('YYYY-MM-DD');

        if (fecha_actual <= primera) {
          let rest = moment(fecha_actual).subtract(2, 'month');
          setCierre(primera)
          setMinimo(moment(rest).format('YYYY-MM-DD'))
        } else if (fecha_actual <= segunda) {
          setCierre(segunda)
          setMinimo(primera)
        } else if (fecha_actual <= tercera) {
          setCierre(tercera)
          setMinimo(segunda)
        } else {
          console.log("Sin fechas de cierre definidas por el momento ")
        }
      } catch (error) {
        //pendiente
      }
    }


    fechasGet()

  }, []);

  useEffect(() => {
    console.log('actualizando clen')
    ccx1=0
    ccx2=0
    ccx3=0
    ccx4=0
    BC1.current.value = 0
    BC2.current.value = 0
    BC3.current.value = 0
    BC4.current.value = 0

    setC1('')
    setC2('')
    setC3('')
    setC4('')

  },[MATERIA_ID])



  const updates = useCallback(async (m, u) => {//actualiza los griterios despues de incertar en la db m:materia u:unidad
    console.log('hook update')
    await getCriterios(m, u);// LISTA DE CRITERIO getTem
    await Promise.all([
      ccx1 = dataCriterios[0].porcentageC1,
      ccx2 = dataCriterios[0].porcentageC2,
      ccx3 = dataCriterios[0].porcentageC3,
      ccx4 = dataCriterios[0].porcentageC4,
      crt1 = dataCriterios[0].criterio1,
      crt2 = dataCriterios[0].criterio2,
      crt3 = dataCriterios[0].criterio3,
      crt4 = dataCriterios[0].criterio4]);
  

    BC1.current.value = ccx1
    BC2.current.value = ccx2
    BC3.current.value = ccx3
    BC4.current.value = ccx4

    BC1.current.style.display = 'block'
    BC2.current.style.display = 'block'
    BC3.current.style.display = 'block'
    BC4.current.style.display = 'block'

    setC1(crt1)
    setC2(crt2)
    setC3(crt3)
    setC4(crt4)
    console.log('finnn-......')
    return true
  }, [])


  const guardarPorcentaje_c1 = useCallback(async () => {//inicio
    console.log('hook porcentaje 1')

    var input = document.getElementById('porcentajeC1');
    input.addEventListener('input', function () {
      if (this.value.length > 2)
        this.value = this.value.slice(0, 2);
    })
    if (input.value <= 100) {
      if (input.value.length === 2) {
        swal("Describa el nombre del creterio:", {
          content: "input",
          closeOnClickOutside: false,
        })
          .then((comentario) => {
            if (comentario) {
              //enviar porcentage y comentario   
              EnviarCriterios(1, input.value, comentario, updates).then(res => { console.log(res) })
            } else {
              alert("No puede estar vacio")
            }
          });
      }
    } else {
      alert("no puede exeder de 100 %")
    }
  }, [])//fin


  const guardarPorcentaje_c2 = useCallback((e) => {//inicio
    console.log('hook porcentaje 2')

    var input2 = document.getElementById('porcentajeC2');//inicio 1
    input2.addEventListener('input', function () {
      if (this.value.length > 2)
        this.value = this.value.slice(0, 2);
    })
    if (input2.value <= 100) {
      if (input2.value.length === 2) {
        //ejecutar metodo de guardar
        swal("describa el nombre del creterio:", {
          content: "input",
          closeOnClickOutside: false,
        })
          .then((comentario) => {
            if (comentario) {
              EnviarCriterios(2, input2.value, comentario, updates).then(res => { console.log(res) })
            } else {
              console.log("No puede estar vacio")
            }
          });
      }
    } else {
      alert("No puede exeder de 100 %")
    }
  }, [])//fin



  const guardarPorcentaje_c3 = useCallback((e) => {//inicio
    console.log('hook porcentaje 3')

    var input3 = document.getElementById('porcentajeC3');//inicio 1
    input3.addEventListener('input', function () {
      if (this.value.length > 2)
        this.value = this.value.slice(0, 2);
    })
    if (input3.value <= 100) {
      if (input3.value.length === 2) {
        swal("describa el nombre del creterio:", {
          content: "input",
          closeOnClickOutside: false,
        })
          .then((comentario) => {
            if (comentario) {
              EnviarCriterios(3, input3.value, comentario, updates).then(res => { console.log(res) })

            } else {
              alert("No puede estar vacio ")
            }
          });
      }
    } else {
      alert("No puede exeder de 100 %")
    }
  }, [])//fin


  const guardarPorcentaje_c4 = useCallback((e) => {//inicio
    console.log('hook porcentaje 4')

    var input4 = document.getElementById('porcentajeC4');//inicio 1
    input4.addEventListener('input', function () {
      if (this.value.length > 2)
        this.value = this.value.slice(0, 2);
    })
    if (input4.value <= 100) {
      if (input4.value.length === 2) {
        swal("Describa el nombre del creterio:", {
          content: "input",
          closeOnClickOutside: false,
        })
          .then((comentario) => {
            if (comentario) {
              //enviarCriteriosc4(input4.value, comentario)
              EnviarCriterios(4, input4.value, comentario, updates).then(res => { console.log(res) })

            } else {
              alert("No puede estar vacio ")
            }
          });
      }
    } else {
      alert("No puede exeder de 100 %")
    }
  }, [])//fin

  funtions.add(updates)

  funtions.add(guardarPorcentaje_c1)
  funtions.add(guardarPorcentaje_c2)
  funtions.add(guardarPorcentaje_c3)
  funtions.add(guardarPorcentaje_c4)
  console.log(funtions)






  const [alumnos, setAlumnos] = React.useState({// datos de la tabla calificacion
    columns: [
      { title: 'Nª', field: 'nm', editable: 'never', defaultSort: 'asc' },
      {
        title: 'Control', field: 'control', editable: 'never', disablePadding: true, minWidth: 10,hideSortIcon:true ,
        cellStyle: { width: "100", textAlign: "left", paddingTop: 2, paddingBottom: 0 }

      },
      { title: 'Nombre', field: 'nameAlumno', editable: 'never', disablePadding: true },
      { title: 'Curso', field: 'curso', editable: 'never', disablePadding: true, minWidth: 10 },
      { title: 'Opcion', field: 'opcion', disablePadding: true, minWidth: 10, lookup: { 1:'1RA', 2: '2DA' }, },
      { title: 'C1', field: 'calR1', disablePadding: true, minWidth: 10, type:'numeric' },
      { title: 'C2', field: 'calR2', disablePadding: true, minWidth: 10,type:'numeric' },
      { title: 'C3', field: 'calR3', disablePadding: true, minWidth: 10,type:'numeric' },
      { title: 'C4', field: 'calR4', disablePadding: true, minWidth: 10,type:'numeric' },
      { title: '#', field: '#', editable: 'never', size: 'small', disablePadding: true },
      { title: <input className="inputTemas" id="porcentajeC1" placeholder="C1" style={{ width: '4ch' }} ref={BC1} onChange={guardarPorcentaje_c1} ></input>, field: 'calCriterio1', editable: 'never', minWidth: 10, disablePadding: true },
      { title: <input className="inputTemas" id="porcentajeC2" placeholder="C2" style={{ width: '4ch' }} ref={BC2} onChange={guardarPorcentaje_c2} ></input>, field: 'calCriterio2', editable: 'never', minWidth: 10, disablePadding: true },
      { title: <input className="inputTemas" id="porcentajeC3" placeholder="C3" style={{ width: '4ch' }} ref={BC3} onChange={guardarPorcentaje_c3}  ></input>, field: 'calCriterio3', editable: 'never', disablePadding: true },
      { title: <input className="inputTemas" id="porcentajeC4" placeholder="C4" style={{ width: '4ch' }} ref={BC4} onChange={guardarPorcentaje_c4}  ></input>, field: 'calCriterio4', editable: 'never', disablePadding: true },
      { title: 'Total', field: 'calificaciontotal', editable: 'never', disablePadding: true }
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
          <h3 >INSTITUTO TECNOLOGICO SUPERIOR DE LOS RIOS</h3>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.paperperiodos}>PERIODO: {dataPeriodo[0].rango}</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.paperperiodos}>CIERRE DE ACTA: {cierre}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={estilos.paperAvatar} elevation={0} >
            <ChipCriterios
              ccx1={ccx1} ccx2={ccx2} ccx3={ccx3} ccx4={ccx4}
              c1={c1} c2={c2} c3={c3} c4={c4} />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.papermaterias}>
            <SelecMaterias setListas={setListas} setcalificaciones={setcalificaciones}
              setMATERIA_ID={setMATERIA_ID} minimo={minimo} cierre={cierre} />
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.papermaterias}>

            <SelectTemas setcalificaciones={setcalificaciones}
              updates={updates} listasTemas={listasTemas}

              setOpen={setOpen}
              MATERIA_ID={MATERIA_ID} />
            {/*<SelectTemas unidad={unidad} lisTemas={obtenerTema}  listasTemas={listasTemas}/>*/}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper elevation={3} >
            <TablaCapturaCalificaciones
              alumnos={alumnos} setcalificaciones={setcalificaciones} calificaciones={calificaciones}
              ccx1={ccx1} ccx2={ccx2} ccx3={ccx3} ccx4={ccx4} />
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
        
         {/*<Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}>
            Descargar Reporte de Calificaciones
          </Button>*/} 
        </Grid>
      </Grid>
    </div>
  );
}



export default React.memo(MaterialTableDemo);