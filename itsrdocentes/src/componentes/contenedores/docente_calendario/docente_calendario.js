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

import { dataMateria } from '../../../home';
import { dataMaterias } from '../../../home';
import { fecha1, fecha2, fecha3 } from '../../../home';
import { treeApi } from '../../servicios/api';
import { StyledTableRow, StyledTableCell, useStyles } from './dialogos';
import { getStatus_temas } from '../../servicios/api';
import { dataStatusTemas } from '../../servicios/api';

import {ID_USUARIO} from '../../../App';



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
  const [btn, setBtn]=React.useState(true);

  const classes = useStyles();
  //variable filtro
  var resultado;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //proceso
    setOpen(false);
  };

  const GuardarTemas = async () => {
    setOpen(false);
    await guardar()
    console.log('Guardando ........')
  };


const [materia, setMateria] = React.useState('');
  const list_materia = async (materiaid) => {// inicio get datos materias- para el select
    const id = materiaid.target.value;
    setMateria(id);
    const data = dataMateria;
    const materia_grupo = id.split(" ");
    const materia = parseInt(materia_grupo[0]);
    const grupo = parseInt(materia_grupo[1]);
    //convercion
    console.log(data)
    console.log(materia_grupo)
    console.log(id + '<<<< id')

    console.log(materia)
    //paso 2
    resultado = await dataMateria.filter(idMateria => (idMateria.idMateria === materia && idMateria.idGrupos === grupo));
    setResul(resultado)
    console.log('resultado data Materia')
    console.log(resultado) //data de la materia existente
    //paso3
    if (resultado[0].exis_unidad === null) {
      console.log("activar tabla")
      setEleccion_temas({data:[]})
      //document.getElementById('mostrar').style.display='block' 
      setActivo('block')

    } else {
      console.log(" tabla desabilitada")
      setActivo('none')
      setBtn(true)
      //listar staus de temas periodo , id personal , id materia
      await getStatus_temas( ID_USUARIO, materia )
      await setEleccion_temas({data:dataStatusTemas})
    }
  };//  fin get datos materias- para el select dataStatusTemas



  //checked
  const [checTema1, setChectema1] = React.useState(false)
  const [checTema2, setChectema2] = React.useState(false)
  const [checTema3, setChectema3] = React.useState(false)
  const [checTema4, setChectema4] = React.useState(false)
  const [checTema5, setChectema5] = React.useState(false)
  const [checTema6, setChectema6] = React.useState(false)
  const [checTema7, setChectema7] = React.useState(false)
  const [checTema8, setChectema8] = React.useState(false)
  const [checTema9, setChectema9] = React.useState(false)
  const [checTema10, setChectema10] = React.useState(false)




 /* useEffect(() => {
    console.log('.....loadddd......1')
    console.log(eleccion_temas)
    console.log('.....loadddd......2')
  })
*/

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



  //paso despues de validar materia
  //var fecha1 = '2020-02-27', fecha2 = '2020-03-27', fecha3 = '2020-04-27';
  const Mitema1 = 'Tema 1';
  const actualizar_fecha_tema1 = date => {//tema1 seleccionar fecha para el tema-----------------------------@#######
    console.log("eliminar del estado")//eliminar
    removerTema(Mitema1)//eliminar

    setChectema1(false)
    setDate_fecha1(date.target.value);
    console.log("------------<")
    console.log(date_ficha1)
    console.log("------------<")
    console.log(eleccion_temas)
  };//fin

  const tema_1 = async (teman) => {//tema1 activar el tema o no
    const numUnidad = 1;
    const valor_chek = teman.target.checked;
    const fechaUpdate = date_ficha1;//obtenida del estado
    setBtn(false)
    setChectema1(valor_chek)
    console.log(valor_chek)
    console.log(checTema1)
    console.log(date_ficha1 + " f_estado")
    console.log(fechaUpdate + " f_real")
    console.log('______________________')
    console.log(eleccion_temas)
    //----
    if (valor_chek === true) {
      validar_fecha(date_ficha1, Mitema1, date_ficha1, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema1)
    }
  }//fin


  

  //tema 2 configuracion
  const Mitema2 = 'Tema 2';
  const actualizar_fecha_tema2 = date => {//tema1-----------------------------····#####3
    if(date.target.value > date_ficha1){
    removerTema(Mitema2)
    setChectema2(false) //cambiar checked a false
    setDate_fecha2(date.target.value);
    console.log("------------<")
    console.log(date_ficha2)
    console.log("------------<")
    }else{
      alert(textFecha)
      setDate_fecha2(default_fecha)
    }
  };//fin

  const tema_2 = async (teman2) => {//tema2
    const numUnidad = 2;
    const valor_chek = teman2.target.checked;
    const fechaUpdate = date_ficha2;
    setChectema2(valor_chek);
    console.log(date_ficha2 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha2, Mitema2, date_ficha2, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema2)
    }
  }//fin tema2

  //tema 3 configuracion
  const Mitema3 = 'Tema 3';
  const actualizar_fecha_tema3 = date => {//tema3-----------------------------########
  if(date.target.value > date_ficha2){
    removerTema(Mitema3)
    setChectema3(false)//canbiar checked a false
    setDate_fecha3(date.target.value);

    console.log("------------<")
    console.log(date_ficha3)
    console.log("------------<")
  }else{
      alert(textFecha)
      setDate_fecha3(default_fecha)
   }
  };


  const tema_3 = async (teman3) => {
    const numUnidad = 3;
    const valor_chek = teman3.target.checked;
    const fechaUpdate = date_ficha3;
    setChectema3(valor_chek);
    console.log(date_ficha3 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha3, Mitema3, date_ficha3, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema3)
    }

  }//fin tema3

  const Mitema4 = 'Tema 4';
  const actualizar_fecha_tema4 = date => {//tema4-----------------------------########
  if(date.target.value > date_ficha3){
    
    removerTema(Mitema4)
    setChectema4(false)//canbiar checked a false
    setDate_fecha4(date.target.value);

    console.log("------------<")
    console.log(date_ficha4)
    console.log("------------<")
  }else{
    alert(textFecha)
    setDate_fecha4(default_fecha)
  }
  };


  const tema_4 = async (teman4) => {
    const numUnidad = 4;
    const valor_chek = teman4.target.checked;
    const fechaUpdate = date_ficha4;
    setChectema4(valor_chek);
    console.log(date_ficha4 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha4, Mitema4, date_ficha4, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema4)
    }

  }//fin tema4


  const Mitema5 = 'Tema 5';
  const actualizar_fecha_tema5 = date => {//tema5-----------------------------########
    if(date.target.value > date_ficha4){
  
    removerTema(Mitema5)
    setChectema5(false)//canbiar checked a false
    setDate_fecha5(date.target.value);

    console.log("------------<")
    console.log(date_ficha5)
    console.log("------------<")
    }else{
      alert(textFecha)
      setDate_fecha5(default_fecha)
    }
  };


  const tema_5 = async (teman5) => {
    const numUnidad = 5;
    const valor_chek = teman5.target.checked;
    const fechaUpdate = date_ficha5;
    setChectema5(valor_chek);
    console.log(date_ficha5 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha5, Mitema5, date_ficha5, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema5)
    }

  }//fin tema5


  const Mitema6 = 'Tema 6';
  const actualizar_fecha_tema6 = date => {//tema6-----------------------------########
    if(date.target.value > date_ficha5){
    
    removerTema(Mitema6)
    setChectema6(false)//canbiar checked a false
    setDate_fecha6(date.target.value);

    console.log("------------<")
    console.log(date_ficha6)
    console.log("------------<")
    }else{
      alert(textFecha)
      setDate_fecha6(default_fecha)
    }
  };


  const tema_6 = async (teman6) => {
    const numUnidad = 6;
    const valor_chek = teman6.target.checked;
    const fechaUpdate = date_ficha6;
    setChectema6(valor_chek);
    console.log(date_ficha6 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha6, Mitema6, date_ficha6, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema6)
    }

  }//fin tema6


  const Mitema7 = 'Tema 7';
  const actualizar_fecha_tema7 = date => {//tema4-----------------------------########
    if(date.target.value > date_ficha6){
  
    removerTema(Mitema7)
    setChectema7(false)//canbiar checked a false
    setDate_fecha7(date.target.value);

    console.log("------------<")
    console.log(date_ficha7)
    console.log("------------<")
    }else{
      alert(textFecha)
      setDate_fecha7(default_fecha)
    }
  };


  const tema_7 = async (teman7) => {
    const numUnidad = 7;
    const valor_chek = teman7.target.checked;
    const fechaUpdate = date_ficha7;
    setChectema7(valor_chek);
    console.log(date_ficha7 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha7, Mitema7, date_ficha7, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema7)
    }

  }//fin tema4


  const Mitema8 = 'Tema 8';
  const actualizar_fecha_tema8 = date => {//tema8-----------------------------########
    if(date.target.value > date_ficha7){
   
    removerTema(Mitema8)
    setChectema8(false)//canbiar checked a false
    setDate_fecha8(date.target.value);

    console.log("------------<")
    console.log(date_ficha8)
    console.log("------------<")
    }else{
      alert(textFecha)
      setDate_fecha8(default_fecha)
    }
  };


  const tema_8 = async (teman8) => {
    const numUnidad = 8;
    const valor_chek = teman8.target.checked;
    const fechaUpdate = date_ficha8;
    setChectema8(valor_chek);
    console.log(date_ficha8 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha8, Mitema8, date_ficha8, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema8)
    }

  }//fin tema8


  const Mitema9 = 'Tema 9';
  const actualizar_fecha_tema9 = date => {//tema9-----------------------------########
    if(date.target.value > date_ficha8){
  
    removerTema(Mitema9)
    setChectema9(false)//canbiar checked a false
    setDate_fecha9(date.target.value);

    console.log("------------<")
    console.log(date_ficha9)
    console.log("------------<")
    }else{
      alert(textFecha)
      setDate_fecha9(default_fecha)
    }
  };


  const tema_9 = async (teman9) => {
    const numUnidad = 9;
    const valor_chek = teman9.target.checked;
    const fechaUpdate = date_ficha9;
    setChectema9(valor_chek);
    console.log(date_ficha9 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha9, Mitema9, date_ficha9, numUnidad)
    } else {
      console.log("eliminar del estado")
      await removerTema(Mitema9)
    }

  }//fin tema9


  const Mitema10 = 'Tema 10';
  const actualizar_fecha_tema10 = date => {//tema10-----------------------------########
    if(date.target.value > date_ficha9){
   
    removerTema(Mitema10)
    setChectema10(false)//canbiar checked a false
    setDate_fecha10(date.target.value);

    console.log("------------<")
    console.log(date_ficha10)
    console.log("------------<")
    }else{
      alert(textFecha)
      setDate_fecha10(default_fecha)
    }
  };


  const tema_10 = async (teman10) => {
    const numUnidad = 10;
    const valor_chek = teman10.target.checked;
    const fechaUpdate = date_ficha10;
    setChectema10(valor_chek);
    console.log(date_ficha10 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if (valor_chek === true) {
      validar_fecha(date_ficha10, Mitema10, date_ficha10, numUnidad)
    } else {
      console.log("eliminar del estado")
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
    const status =  await treeApi(element);//enviar datos al api
      console.log(element)
      console.log(status+'(ver status')
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
    console.log(i)
    console.log("wwwww   " + i)
    if (i !== -1) {
      console.log("eliminando .... ")                                         
      await setEleccion_temas({
        data: eleccion_temas.data.filter((x) => x.tema1_nombre !== temaRemu)
      })
      console.log(eleccion_temas)
    }
  }// eliminar fecha




  const validar_fecha = (fechaTema, temaActual, fechaLimite, numUnidad) => {// inicio validar fecha
    var data_value = { id_Materias: resul_state[0].idMateria, periodo: resul_state[0].idnomenclaturaPeriodo, grupo_id: resul_state[0].idGrupos, tema1_nombre: temaActual, fecha_limite: fechaLimite, numUnidad }

    console.log(' ejecuatando .. agregar data fechas= ' + fecha1 + ' y ' + fecha2 + ' y  ' + fecha3)

    if (fechaTema <= fecha1 || fechaTema <= fecha3) {
      //paso1
      if (fechaTema <= fecha1) {//###########################

        setEleccion_temas({ ...eleccion_temas, data: eleccion_temas.data.concat(data_value) })//actualiar el estado de la tabla tmas
        data_value = {}
        console.log('fecha cierre  1 true')
      } else {
        //fin ffecha 1 true
        if (fechaTema > fecha1 && fechaTema <= fecha2) {//#####################
          //  var data_value = { id_Materias:resul_state[0].idMateria, periodo:resul_state[0].idnomenclaturaPeriodo, grupo_id:resul_state[0].idGrupos, tema1_nombre: temaActual }
          setEleccion_temas({ ...eleccion_temas, data: eleccion_temas.data.concat(data_value) })//actualiar el estado de la tabla tmas
          data_value = {}

          console.log('fecha cierre 2 true')
        } else {
          if (fechaTema > fecha2 && fechaTema <= fecha3) {//###############

            setEleccion_temas({ ...eleccion_temas, data: eleccion_temas.data.concat(data_value) })//actualiar el estado de la tabla tmas
            data_value = {}

            console.log('fecha cierre 3 true')
          } else {
            //fin fecha 3
          }
          //fin fecha 2
        }
        //fin fecha 1
      }

    } else {
      console.log('la fecha no puede ser mayor al cierre de acta numero 3')

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
          {/* inicio materias lista*/}
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="InputLabel">Materia</InputLabel>
            <Select
              labelId="demo-simple-select-outlined"
              id="listmateria"
              onChange={list_materia}
              label="Materia"
              value={materia}
            >
              {
                dataMateria.map((materias) => (<MenuItem key={materias.nm} value={materias.idMateria + " " + materias.idGrupos} >{materias.nombre + ' (' + materias.semestre + "/" + materias.nomenclatura + ") " + materias.nombreCorto}</MenuItem>))
              }
            </Select>
          </FormControl>
          {/* fin materias lista*/}
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
          {/*fin tabla temas*/}
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>DOCENTE: {dataMateria[0].nameDocente}</h2>

          {/*listas de temas */}
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
              startIcon={<SaveIcon />}
            >
              Guardar
      </Button>

          </TableContainer>
          {/*fin */}


        </Grid>
      </Grid>


    </div>
  );
}
