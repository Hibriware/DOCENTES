import React,{useEffect} from 'react';
import 'date-fns';
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
import { dataMateria} from '../../../home';
import { dataMaterias} from '../../../home';
import { fecha1, fecha2, fecha3} from '../../../home';

import {treeApi} from '../../servicios/api';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {StyledTableRow , StyledTableCell,useStyles} from './dialogos'
  







function createDatatemas(save, tema, fecha, ) {

  return { save, tema, fecha };
}


export default  function CustomizedTables()  {
  var loaderStatus = false;
  const [loaddig, setLoad] = React.useState(loaderStatus);
  const [open, setOpen] = React.useState(false);
 



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

 
  const classes = useStyles();
  const [activo, setActivo] = React.useState('none');
  //variable filtro
  var resultado;
  const [resul_state, setResul] = React.useState();


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
    resultado = await dataMateria.filter(idMateria => (idMateria.idMateria === materia && idMateria.idGrupos === grupo));
    setResul(resultado)
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



  //checked
  const [checTema1, setChectema1] = React.useState(false)
  const [checTema2, setChectema2] = React.useState(false)
  const [checTema3, setChectema3] = React.useState(false)


  useEffect(() => {console.log('.....loadddd......1')
  console.log(eleccion_temas)
  console.log('.....loadddd......2')
})


  //fecha
  var default_fecha = new Date('2014-08-18T21:11:54');
  const [date_ficha1, setDate_fecha1] = React.useState(default_fecha);
  const [date_ficha2, setDate_fecha2] = React.useState(default_fecha);
  const [date_ficha3, setDate_fecha3] = React.useState(default_fecha);
  //estado de la table tema
  const [eleccion_temas, setEleccion_temas] = React.useState({ data:[] });
  //paso despues de validar materia
  //var fecha1 = '2020-02-27', fecha2 = '2020-03-27', fecha3 = '2020-04-27';
  const Mitema1 =  'Tema 1';


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
    const valor_chek = teman.target.checked;
    const fechaUpdate = date_ficha1;//obtenida del estado
    setChectema1(valor_chek)
    console.log(valor_chek)
    console.log(checTema1)
    console.log(date_ficha1 + " f_estado")
    console.log(fechaUpdate + " f_real")
    console.log('______________________')
    console.log(eleccion_temas)
//----
if(valor_chek === true){
validar_fecha(date_ficha1,Mitema1,date_ficha1)
}else{
  console.log("eliminar del estado")
 await removerTema(Mitema1)
}
  }//fin


              const removerTema = async (temaRemu)=>{
                var i = eleccion_temas.data.findIndex( data =>(data.tema1_nombre === temaRemu) );
                console.log(i)
                console.log("wwwww   "+i)
                    if ( i !== -1 ) {
                console.log("eliminando .... ")                                           /**{...eleccion_temas.data,
                                                                                               data: eleccion_temas.data.splice(i, 0)
                                                                                              } */
                 await  setEleccion_temas({
                  data:  eleccion_temas.data.filter((x) => x.tema1_nombre !== temaRemu)
                 })
                      console.log(eleccion_temas)
                     }
              }
/*prevState => {
                            const generalAlumnos = [...prevState.generalAlumnos];//obtenr data
                      
                            generalAlumnos[generalAlumnos.indexOf(oldData)] = newData;
                            // manejador(newData.c1, newData.c2, newData.c3)

                            return { ...prevState, generalAlumnos };
                          } */



                                              //arru fechas
                                              const validar_fecha =(fechaTema, temaActual, fechaLimite)=>{
                                                var data_value = { id_Materias:resul_state[0].idMateria, periodo:resul_state[0].idnomenclaturaPeriodo, grupo_id:resul_state[0].idGrupos, tema1_nombre: temaActual,fecha_limite:fechaLimite}
                                                
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
                                                        }  else {
                                                          //fin fecha 3
                                                        }
                                                        //fin fecha 2
                                                      }
                                                      //fin fecha 1
                                                    }

                                      } else {
                                       console.log('la fecha no puede ser mayor al cierre de acta numero 3')

                                             }

                                              }

                                      
                                                 const guardar = async () =>{
                                                  loaderStatus =true; 
                                                //llamar dialogo de confirmacion
                                                
                                                //activar load..
                                                //paticion para el api
                                              for (let index = 0; index < eleccion_temas.data.length; index++) {
                                                  const element = eleccion_temas.data[index];
                                                  await treeApi(element);
                                                  console.log(element)
                                                }
                                                await dataMaterias()

                                                console.log(loaddig)

                                                loaderStatus = false;
                           }
                                            
                                                
  //tema 2 configuracion
const Mitema2 = 'Tema 2';
  const actualizar_fecha_tema2 = date => {//tema1-----------------------------····#####3
    removerTema(Mitema2)
    setChectema2(false) //cambiar checked a false
    setDate_fecha2(date.target.value);
    console.log("------------<")
    console.log(date_ficha2)
    console.log("------------<")

  };//fin

  const tema_2 = async (teman2) => {//tema2
    const valor_chek = teman2.target.checked;
    const fechaUpdate = date_ficha2;
    setChectema2(valor_chek);
    console.log(date_ficha2 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if(valor_chek === true){
      validar_fecha(date_ficha1,Mitema2,date_ficha2)
      }else{
        console.log("eliminar del estado")
       await removerTema(Mitema2)
      }

  }//fin tema2

  //tema 2 configuracion
  const Mitema3 = 'Tema 3';
  const actualizar_fecha_tema3 = date => {//tema3-----------------------------########
    removerTema(Mitema3)
    setChectema3(false)//canbiar checked a false
    setDate_fecha3(date.target.value);

    console.log("------------<")
    console.log(date_ficha3)
    console.log("------------<")
  };//fin


  const tema_3  = async (teman3) => {//tema2
    const valor_chek = teman3.target.checked;
    const fechaUpdate = date_ficha3;
    setChectema3(valor_chek);
    console.log(date_ficha3 + " f_estado")
    console.log(fechaUpdate + " f_real")

    if(valor_chek === true){
      validar_fecha(date_ficha1,Mitema3,date_ficha3)
      }else{
        console.log("eliminar del estado")
       await removerTema(Mitema3)
      }
    
  }//fin tema2


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
 <Backdrop className={classes.backdrop} open={loaddig}>
  <CircularProgress color="inherit" /></Backdrop>;

<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nota...</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Esta apunto de guardar datos que no podra modificar
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
                {eleccion_temas.data.map((row,i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                    {row.fecha_limite <= fecha1 ? row.tema1_nombre :'--'}
                    </TableCell>
                    <TableCell align="right">{row.fecha_limite > fecha1 && row.fecha_limite <= fecha2 ? row.tema1_nombre :'--'}</TableCell>
                    <TableCell align="right">{row.fecha_limite > fecha2 && row.fecha_limite <= fecha3 ? row.tema1_nombre :'--'}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleClickOpen}
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
