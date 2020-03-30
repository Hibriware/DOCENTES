import React from 'react';
import 'date-fns';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { dataMateria } from '../../../home'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function createData(name, calories, fat, carbs, protein) {


  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('TEMA 1', '', ''),
  createData('', 'TEMA 2', ''),
  createData('TEMA3', '', ''),
  createData('', 'TEMA 4', ''),
  createData('', 'TEMA 5', ''),
  createData('', 'TEMA 6', ''),

];
const lisTemas =
  { primeraEntrega: '20/06/2020', tema: 'tema1' }
  ;


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const fechaTema = seletc_fecha => {
  let seletc = seletc_fecha;
  console.log(seletc + 'fecha ')
};
const materiaN = (id_m, periodo_m) => {
  console.log(id_m + " - " + periodo_m)
}

function createDatatemas(save, tema, fecha, ) {

  return { save, tema, fecha };
}

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  formControl: {
    display: 'flex',
    minWidth: 100,
  },
});



export default function CustomizedTables() {
  const classes = useStyles();
  const [activo, setActivo] = React.useState('none');

  const list_materia = async (materiaid) => {//datos materias-----------------------
    const id = materiaid.target.value;
    const data = dataMateria;
    const materia_grupo = id.split(" ");
    const materia = parseInt(materia_grupo[0]);
    const grupo = parseInt(materia_grupo[1]);
    //convercion

    console.log(data)
    console.log(id)
    console.log(materia)
    //paso 2
    var resultado = await dataMateria.filter(idMateria => (idMateria.idMateria === materia && idMateria.idGrupos === grupo));
    console.log('resultado data Materia')
    console.log(resultado) //data de la materia existente
    //paso3
    if (resultado[0].exis_unidad === null) {
      console.log("activar tabla")

      //document.getElementById('mostrar').style.display='block' 
      setActivo('block')
    } else {
      console.log(" tabla desabilitada")
      setActivo('none')
    }


  };

  const [selectedDate, setSelectedDate] = React.useState({
    date_tema1: new Date('2014-08-18T21:11:54'),
    date_tema2: new Date('2014-08-18T21:11:54'),
    date_tema3: new Date('2014-08-18T21:11:54'),
    date_tema4: new Date('2014-08-18T21:11:54')
  })

  //checked
  const [checTema1, setChectema1] = React.useState(false)
  const [checTema2, setChectema2] = React.useState(false)
  const [checTema3, setChectema3] = React.useState(false)

  //fecha
  var default_fecha = new Date('2014-08-18T21:11:54');
  const [date_ficha1, setDate_fecha1] = React.useState(default_fecha);
  const [date_ficha2, setDate_fecha2] = React.useState(default_fecha);
  const [date_ficha3, setDate_fecha3] = React.useState(default_fecha);
  //estado de la table tema
  const [eleccion_temas, setEleccion_temas] = React.useState({ data: [] });
  //paso despues de validar materia
  var fecha1 = '2020-02-27', fecha2 = '2020-03-27', fecha3 = '2020-04-27';
  const actualizar_fecha_tema1 = date => {//tema1 seleccionar fecha para el tema-----------------------------@#######
    setChectema1(false)
    setDate_fecha1(date.target.value);
    console.log("------------<")
    console.log(date_ficha1)
    console.log("------------<")
    

    
    console.log(eleccion_temas)
  };//fin
  // var datass=[0];
  // var datass = new Array();

  const tema_1 = (teman) => {//tema1 activar el tema o no
    const valor_chek = teman.target.checked;
    const fechaUpdate = date_ficha1;//obtenida del estado
    setChectema1(valor_chek)
    console.log(valor_chek)
    console.log(checTema1)
    console.log(date_ficha1 + " f_estado")

    console.log(fechaUpdate + " f_real")


    console.log('______________________')
    console.log(eleccion_temas)

    console.log('fechas= ' + fecha1 + ' y ' + fecha2 + ' y  ' + fecha3)
    if (date_ficha1 <= fecha1 || date_ficha1 <= fecha3) {
      //paso1
      if (date_ficha1 <= fecha1) {//###########################
        
        var data_value = { id_Materias:'2',periodo:'6',grupo_id:'1', tema1_nombre: 'Tema1' }
        setEleccion_temas({ ...eleccion_temas, data: eleccion_temas.data.concat(data_value) })//actualiar el estado de la tabla tmas

        console.log('fecha cierre  1 true')
      } else {
        //fin ffecha 1 true
        if (date_ficha1 > fecha1 && date_ficha1 <= fecha2) {//#####################

          
          console.log('fecha cierre 2 true')
        } else {
          if (date_ficha1 > fecha2 && date_ficha1 <= fecha3) {//###############
            
            
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

  }//fin

  //tema 2 configuracion
  const actualizar_fecha_tema2 = date => {//tema1-----------------------------····#####3
    setChectema2(false)//canbiar checked a false
    setDate_fecha2(date.target.value);

    console.log("------------<")
    console.log(date_ficha2)
    console.log("------------<")
  };//fin

  const tema_2 = (teman2) => {//tema2
    const valor_chek = teman2.target.checked;
    const fechaUpdate = date_ficha2;
    setChectema2(valor_chek);
    console.log(date_ficha2 + " f_estado")
    console.log(fechaUpdate + " f_real")
  }//fin tema2

  //tema 2 configuracion
  const actualizar_fecha_tema3 = date => {//tema3-----------------------------########
    setChectema3(false)//canbiar checked a false
    setDate_fecha3(date.target.value);

    console.log("------------<")
    console.log(date_ficha3)
    console.log("------------<")
  };//fin

  const tema_3 = (teman3) => {//tema2
    const valor_chek = teman3.target.checked;
    const fechaUpdate = date_ficha3;
    setChectema3(valor_chek);
    console.log(date_ficha3 + " f_estado")
    console.log(fechaUpdate + " f_real")
  }//fin tema2

  //funcion para table gurdar temas

  //cinfiguracion tema3

  const temasFilas = [
    createDatatemas(<Checkbox id="t1" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema1} onChange={tema_1} />, 'Tema 1', <input type="date" id="tema1" onChange={actualizar_fecha_tema1} />),
    createDatatemas(<Checkbox id="t2" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema2} onChange={tema_2} />, 'Tema 2', <input type="date" id="tema2" onChange={actualizar_fecha_tema2} />),
    createDatatemas(<Checkbox id="t3" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} checked={checTema3} onChange={tema_3} />, 'Tema 3', <input type="date" id="tema3" onChange={actualizar_fecha_tema3} />),
    createDatatemas(<Checkbox id="t4" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 4', <input type="date" id="tema4" />),
    createDatatemas(<Checkbox id="t5" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 5', 'data'),
    createDatatemas(<Checkbox id="t6" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 6', 'data'),
    createDatatemas(<Checkbox id="t7" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 7', 'data'),
    createDatatemas(<Checkbox id="t8" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 8', 'data'),
    createDatatemas(<Checkbox id="t9" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 9', 'data'),
    createDatatemas(<Checkbox id="t10" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 10', 'data'),
  ];


  return (
    <div>
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
            >
              {
                dataMateria.map((materias) => (<MenuItem key={materias.nm} value={materias.idMateria + " " + materias.idGrupos} >{materias.nombre + ' (' + materias.semestre + "/" + materias.nomenclatura + ") " + materias.nombreCorto}</MenuItem>))
              }
            </Select>
          </FormControl>
          {/* fin materias lista*/}
          <div id="mostrar" style={{ display: activo }}>
            <TableContainer id="tablaMaterias" component={Paper} >
              <Table className={classes.table} aria-label="customized table" >
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
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
      </Button>
          </TableContainer>
          {/*fin */}


        </Grid>
      </Grid>


    </div>
  );
}