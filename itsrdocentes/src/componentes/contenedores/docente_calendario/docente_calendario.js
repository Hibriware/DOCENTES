import React, { useEffect } from 'react';
import 'date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { dataMaterias, dataMateria } from '../../../home';
import { StyledTableRow, StyledTableCell, useStyles } from './dialogos';
import { dataStatusTemas, getAdmiFechas, dataFechasCierre, treeApi, getStatus_temas } from '../../servicios/api';
import { ID_USUARIO } from '../../../App';
var resultado;



function createDatatemas(save, tema, fecha, ) {
  return { save, tema, fecha };
}

export default function CustomizedTables() { //constante tablas
  //estado de la table tema
  const [eleccion_temas, setEleccion_temas] = React.useState({ data: [] });
  const [loaddig, setLoad] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [activo, setActivo] = React.useState('none');
  const [resul_state, setResul] = React.useState();
  const [btn, setBtn] = React.useState(true);
  //fecha
  var default_fecha = new Date('2014-08-18T21:11:54');
  const [date_ficha1, setDate_fecha1] = React.useState(default_fecha);
  const [date_ficha2, setDate_fecha2] = React.useState(default_fecha);
  const [date_ficha3, setDate_fecha3] = React.useState(default_fecha);
  const [date_ficha4, setDate_fecha4] = React.useState(default_fecha);
  const [date_ficha5, setDate_fecha5] = React.useState(default_fecha);
  const [date_ficha6, setDate_fecha6] = React.useState(default_fecha);
  const [date_ficha7, setDate_fecha7] = React.useState(default_fecha);
  const [date_ficha8, setDate_fecha8] = React.useState(default_fecha);
  const [date_ficha9, setDate_fecha9] = React.useState(default_fecha);
  const [date_ficha10, setDate_fecha10] = React.useState(default_fecha);
  const textFecha = 'La fecha no puede ser menor a la anterior';
  //checked
  const [checTema1, setChectema1] = React.useState(false);
  const [checTema2, setChectema2] = React.useState(false);
  const [checTema3, setChectema3] = React.useState(false);
  const [checTema4, setChectema4] = React.useState(false);
  const [checTema5, setChectema5] = React.useState(false);
  const [checTema6, setChectema6] = React.useState(false);
  const [checTema7, setChectema7] = React.useState(false);
  const [checTema8, setChectema8] = React.useState(false);
  const [checTema9, setChectema9] = React.useState(false);
  const [checTema10, setChectema10] = React.useState(false);
  //fechas cieere de acta actual
  const fecha_Defaul = moment(new Date()).format('DD-MM-YYYY');
  const [fecha1, setFecha1] = React.useState(fecha_Defaul);
  const [fecha2, setFecha2] = React.useState(fecha_Defaul);
  const [fecha3, setFecha3] = React.useState(fecha_Defaul);
  const [disablesd, setDisablesd] = React.useState(false);
  const [materia, setMateria] = React.useState('');
  const classes = useStyles();


  useEffect(() => {
    async function fechas() {
      try {
        await getAdmiFechas()//moment().format('DD-MM-YYYY')
        setFecha1(moment(dataFechasCierre[0].primera_entrega).format('YYYY-MM-DD'))
        setFecha2(moment(dataFechasCierre[0].segunda_entrega).format('YYYY-MM-DD'))
        setFecha3(moment(dataFechasCierre[0].tercera_entrega).format('YYYY-MM-DD'))
      } catch (error) {
        setDisablesd(true)
      }
    }
    fechas()
  }, [])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const GuardarTemas = async () => {
    setOpen(false);
    await guardar()
  };


  const list_materia = async (materiaid) => {// inicio get datos materias- para el select
    var id = materiaid.target.value;
    setMateria(id);
    var materia_grupo = id.split(" "); // separa los datos del arry
    var materia = parseInt(materia_grupo[0]);
    var grupo = parseInt(materia_grupo[1]);

    resultado = await dataMateria.filter(idMateria => (idMateria.idMateria === materia && idMateria.idGrupos === grupo));
    setResul(resultado)
    if (resultado[0].exis_unidad === null) { // activar la tabla
      setEleccion_temas({ data: [] })
      setActivo('block')
    } else {
      setActivo('none')
      setBtn(true)
      //listar staus de temas periodo , id personal , id materia
      await getStatus_temas(ID_USUARIO, materia)
      await setEleccion_temas({ data: dataStatusTemas })
    }
  };//  fin get datos materias- para el select dataStatusTemas


  //paso despues de validar materia
  //var fecha1 = '2020-02-27', fecha2 = '2020-03-27', fecha3 = '2020-04-27';
  const Mitema1 = 'Tema 1';
  const actualizar_fecha_tema1 = date => {//tema1 seleccionar fecha para el tema-----------------------------@#######
    removerTema(Mitema1)//eliminar estado
    setChectema1(false)
    setDate_fecha1(date.target.value);
  };//fin

  const tema_1 = async (teman) => {//tema1 activar el tema o no
    const numUnidad = 1;
    const valor_chek = teman.target.checked;
    setBtn(false)
    setChectema1(valor_chek)
    if (valor_chek === true) {
      validar_fecha(date_ficha1, Mitema1, date_ficha1, numUnidad)
    } else {
      await removerTema(Mitema1) // eliminar estado
    }
  }//fin

  //tema 2 configuracion
  const Mitema2 = 'Tema 2';
  const actualizar_fecha_tema2 = date => {//tema1-----------------------------····#####3
    if (date.target.value > date_ficha1) {
      removerTema(Mitema2)
      setChectema2(false) //cambiar checked a false
      setDate_fecha2(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha2(default_fecha)
    }
  };//fin

  const tema_2 = async (teman2) => {//tema2
    const numUnidad = 2;
    const valor_chek = teman2.target.checked;
    setChectema2(valor_chek);
    if (valor_chek === true) {
      validar_fecha(date_ficha2, Mitema2, date_ficha2, numUnidad)
    } else {
      await removerTema(Mitema2)
    }
  }//fin tema2

  //tema 3 configuracion
  const Mitema3 = 'Tema 3';
  const actualizar_fecha_tema3 = date => {//tema3-----------------------------########
    if (date.target.value > date_ficha2) {
      removerTema(Mitema3)
      setChectema3(false)//canbiar checked a false
      setDate_fecha3(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha3(default_fecha)
    }
  };

  const tema_3 = async (teman3) => {
    const numUnidad = 3;
    const valor_chek = teman3.target.checked;
    setChectema3(valor_chek);

    if (valor_chek === true) {
      validar_fecha(date_ficha3, Mitema3, date_ficha3, numUnidad)
    } else {
      await removerTema(Mitema3)
    }
  }//fin tema3

  const Mitema4 = 'Tema 4';
  const actualizar_fecha_tema4 = date => {//tema4-----------------------------########
    if (date.target.value > date_ficha3) {
      removerTema(Mitema4)
      setChectema4(false)//canbiar checked a false
      setDate_fecha4(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha4(default_fecha)
    }
  };

  const tema_4 = async (teman4) => {
    const numUnidad = 4;
    const valor_chek = teman4.target.checked;
    setChectema4(valor_chek);

    if (valor_chek === true) {
      validar_fecha(date_ficha4, Mitema4, date_ficha4, numUnidad)
    } else {
      await removerTema(Mitema4)
    }

  }//fin tema4


  const Mitema5 = 'Tema 5';
  const actualizar_fecha_tema5 = date => {//tema5-----------------------------########
    if (date.target.value > date_ficha4) {
      removerTema(Mitema5)
      setChectema5(false)//canbiar checked a false
      setDate_fecha5(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha5(default_fecha)
    }
  };

  const tema_5 = async (teman5) => {
    const numUnidad = 5;
    const valor_chek = teman5.target.checked;
    setChectema5(valor_chek);

    if (valor_chek === true) {
      validar_fecha(date_ficha5, Mitema5, date_ficha5, numUnidad)
    } else {
      await removerTema(Mitema5)
    }
  }//fin tema5


  const Mitema6 = 'Tema 6';
  const actualizar_fecha_tema6 = date => {//tema6-----------------------------########
    if (date.target.value > date_ficha5) {
      removerTema(Mitema6)
      setChectema6(false)//canbiar checked a false
      setDate_fecha6(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha6(default_fecha)
    }
  };

  const tema_6 = async (teman6) => {
    const numUnidad = 6;
    const valor_chek = teman6.target.checked;
    setChectema6(valor_chek);

    if (valor_chek === true) {
      validar_fecha(date_ficha6, Mitema6, date_ficha6, numUnidad)
    } else {
      await removerTema(Mitema6)
    }
  }//fin tema6


  const Mitema7 = 'Tema 7';
  const actualizar_fecha_tema7 = date => {//tema4-----------------------------########
    if (date.target.value > date_ficha6) {
      removerTema(Mitema7)
      setChectema7(false)//canbiar checked a false
      setDate_fecha7(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha7(default_fecha)
    }
  };


  const tema_7 = async (teman7) => {
    const numUnidad = 7;
    const valor_chek = teman7.target.checked;
    setChectema7(valor_chek);
    if (valor_chek === true) {
      validar_fecha(date_ficha7, Mitema7, date_ficha7, numUnidad)
    } else {
      await removerTema(Mitema7)
    }
  }//fin tema4


  const Mitema8 = 'Tema 8';
  const actualizar_fecha_tema8 = date => {//tema8-----------------------------########
    if (date.target.value > date_ficha7) {
      removerTema(Mitema8)
      setChectema8(false)//canbiar checked a false
      setDate_fecha8(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha8(default_fecha)
    }
  };

  const tema_8 = async (teman8) => {
    const numUnidad = 8;
    const valor_chek = teman8.target.checked;
    setChectema8(valor_chek);

    if (valor_chek === true) {
      validar_fecha(date_ficha8, Mitema8, date_ficha8, numUnidad)
    } else {
      await removerTema(Mitema8)
    }
  }//fin tema8


  const Mitema9 = 'Tema 9';
  const actualizar_fecha_tema9 = date => {//tema9-----------------------------########
    if (date.target.value > date_ficha8) {
      removerTema(Mitema9)
      setChectema9(false)//canbiar checked a false
      setDate_fecha9(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha9(default_fecha)
    }
  };

  const tema_9 = async (teman9) => {
    const numUnidad = 9;
    const valor_chek = teman9.target.checked;
    setChectema9(valor_chek);
    if (valor_chek === true) {
      validar_fecha(date_ficha9, Mitema9, date_ficha9, numUnidad)
    } else {
      await removerTema(Mitema9)
    }
  }//fin tema9

  const Mitema10 = 'Tema 10';
  const actualizar_fecha_tema10 = date => {//tema10-----------------------------########
    if (date.target.value > date_ficha9) {
      removerTema(Mitema10)
      setChectema10(false)//canbiar checked a false
      setDate_fecha10(date.target.value);
    } else {
      alert(textFecha)
      setDate_fecha10(default_fecha)
    }
  };

  const tema_10 = async (teman10) => {
    const numUnidad = 10;
    const valor_chek = teman10.target.checked;
    setChectema10(valor_chek);
    if (valor_chek === true) {
      validar_fecha(date_ficha10, Mitema10, date_ficha10, numUnidad)
    } else {
      await removerTema(Mitema10)
    }
  }//fin tema10

  const guardar = async () => { // inicio guardar temas y fechas seleccionadas
    //llamar dialogo de confirmacion
    setLoad(true)
    //activar load..
    //paticion para el api
    for (let index = 0; index < eleccion_temas.data.length; index++) {
      const element = eleccion_temas.data[index];
      await treeApi(element);//enviar datos al api
      setChectema1(false)
    }

    await dataMaterias()//actualizar db

    setEleccion_temas({ data: [] })                   //limpiar tabla
    setActivo('none')
    setLoad(false)
    setChectema1(false)
    setChectema2(false)
    setChectema3(false)
    setChectema4(false)
    setChectema5(false)
    setChectema6(false)
    setChectema7(false)
    setChectema8(false)
    setChectema9(false)
    setChectema10(false)
    setBtn(true)
    swal("Correcto!", "Temas Guardados!", "success");
  }// fin guardar temas y fechas seleccionadas

  const removerTema = async (temaRemu) => {//eliminar fecha
    var i = eleccion_temas.data.findIndex(data => (data.tema1_nombre === temaRemu));
    if (i !== -1) {
      await setEleccion_temas({
        data: eleccion_temas.data.filter((x) => x.tema1_nombre !== temaRemu)
      })
    }
  }// eliminar fecha


  const validar_fecha = (fechaTema, temaActual, fechaLimite, numUnidad) => {// inicio validar fecha
    var data_value = { id_Materias: resul_state[0].idMateria, periodo: resul_state[0].idnomenclaturaPeriodo, grupo_id: resul_state[0].idGrupos, tema1_nombre: temaActual, fecha_limite: fechaLimite, numUnidad }

    if (fechaTema <= fecha1 || fechaTema <= fecha3) {
      //paso1
      if (fechaTema <= fecha1) {//###########################

        setEleccion_temas({ ...eleccion_temas, data: eleccion_temas.data.concat(data_value) })//actualiar el estado de la tabla tmas
        data_value = {}
      } else {
        //fin ffecha 1 true
        if (fechaTema > fecha1 && fechaTema <= fecha2) {//#####################
          //  var data_value = { id_Materias:resul_state[0].idMateria, periodo:resul_state[0].idnomenclaturaPeriodo, grupo_id:resul_state[0].idGrupos, tema1_nombre: temaActual }
          setEleccion_temas({ ...eleccion_temas, data: eleccion_temas.data.concat(data_value) })//actualiar el estado de la tabla tmas
          data_value = {}
        } else {
          if (fechaTema > fecha2 && fechaTema <= fecha3) {//###############

            setEleccion_temas({ ...eleccion_temas, data: eleccion_temas.data.concat(data_value) })//actualiar el estado de la tabla tmas
            data_value = {}
          } else {
            //fin fecha 3
          }
          //fin fecha 2
        }
        //fin fecha 1
      }
    } else {
      alert('La fecha no puede ser mayor al tercer cierre')
    }
  }//fin  validar fechas


  //cinfiguracion tema3
  const temasFilas = [
    createDatatemas(<Checkbox id="t1" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema1} onChange={tema_1} />, 'Tema 1', <input type="date" id="tema1" onChange={actualizar_fecha_tema1} />),
    createDatatemas(<Checkbox id="t2" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema2} onChange={tema_2} />, 'Tema 2', <input type="date" id="tema2" onChange={actualizar_fecha_tema2} />),
    createDatatemas(<Checkbox id="t3" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema3} onChange={tema_3} />, 'Tema 3', <input type="date" id="tema3" onChange={actualizar_fecha_tema3} />),
    createDatatemas(<Checkbox id="t4" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema4} onChange={tema_4} />, 'Tema 4', <input type="date" id="tema4" onChange={actualizar_fecha_tema4} />),
    createDatatemas(<Checkbox id="t5" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema5} onChange={tema_5} />, 'Tema 5', <input type="date" id="tema5" onChange={actualizar_fecha_tema5} />),
    createDatatemas(<Checkbox id="t6" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema6} onChange={tema_6} />, 'Tema 6', <input type="date" id="tema6" onChange={actualizar_fecha_tema6} />),
    createDatatemas(<Checkbox id="t7" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema7} onChange={tema_7} />, 'Tema 7', <input type="date" id="tema7" onChange={actualizar_fecha_tema7} />),
    createDatatemas(<Checkbox id="t8" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema8} onChange={tema_8} />, 'Tema 8', <input type="date" id="tema8" onChange={actualizar_fecha_tema8} />),
    createDatatemas(<Checkbox id="t9" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema9} onChange={tema_9} />, 'Tema 9', <input type="date" id="tema9" onChange={actualizar_fecha_tema9} />),
    createDatatemas(<Checkbox id="t10" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema10} onChange={tema_10} />, 'Tema 10', <input type="date" id="tema10" onChange={actualizar_fecha_tema10} />),
  ];



  return (
    <div>
      <Backdrop className={classes.backdrop} open={loaddig}>
        <CircularProgress color="inherit" /></Backdrop>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nota...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirme que las fechas seleccionadas
            son las correctas para las evaluaciones formativas.
            No podrá hacer cambios.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={GuardarTemas} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="InputLabel">Materia</InputLabel>
            <Select
              labelId="demo-simple-select-outlined"
              id="listmateria"
              onChange={list_materia}
              label="Materia"
              value={materia}
              disabled={disablesd}>
              {dataMateria.map((materias) => (<MenuItem key={materias.nm} value={materias.idMateria + " " + materias.idGrupos} >{materias.nombre + ' (' + materias.semestre + "/" + materias.nomenclatura + ") " + materias.nombreCorto}</MenuItem>))}
            </Select>
          </FormControl>
          <div id="mostrar" style={{ display: activo }}>
            <TableContainer id="tablaMaterias" component={Paper} >
              <Table className={classes.table} aria-label="customized table" id="undateTable">
                <TableHead>
                  <TableRow>
                    <StyledTableCell >Save</StyledTableCell>
                    <StyledTableCell align="right"  >Temas</StyledTableCell>
                    <StyledTableCell align="right">Fecha de Evaluacion</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {temasFilas.map((row1, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {row1.save}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row1.tema}</StyledTableCell>
                      <StyledTableCell align="right">{row1.fecha}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>DOCENTE: {dataMateria[0].nameDocente}</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Primera entrega:{fecha1}</TableCell>
                  <TableCell align="right">Segunda entrega:{fecha2}</TableCell>
                  <TableCell align="right">Tercera entrega:{fecha3}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eleccion_temas.data.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {row.fecha_limite <= fecha1 ? row.tema1_nombre : '--'}
                    </TableCell>
                    <TableCell align="right">{row.fecha_limite > fecha1 && row.fecha_limite <= fecha2 ? row.tema1_nombre : '--'}</TableCell>
                    <TableCell align="right">{row.fecha_limite > fecha2 && row.fecha_limite <= fecha3 ? row.tema1_nombre : '--'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              disabled={btn}
              variant="contained"
              color="primary"
              size="small"
              onClick={handleClickOpen}
              startIcon={<SaveIcon />}>
              Guardar
             </Button>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
