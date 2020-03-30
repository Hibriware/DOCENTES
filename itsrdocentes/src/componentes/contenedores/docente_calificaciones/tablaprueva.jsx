import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
//importdos
import { data } from './clase_principal_calificaciones';
import './calificaciones.css';
//variables
import { tema1X, tema2X, tema3X, porcentajeActual, dataAlumnos } from './clase_principal_calificaciones';
import { startOfYesterday } from 'date-fns';
import { dataMateria } from '../../../home'



const useStyles = makeStyles(theme => ({
  formControl: {
    display:'flex',
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(-1),
  },
  papermaterias: {
    padding: theme.spacing(-1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paperperiodos: {
    padding: theme.spacing(-2),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
}));





const MaterialTableDemo = ({ generalAlumnos, materiasDocentes, porcentaje, updateCalificacion }) => {

  

  const estilos = useStyles();
  const [materiaID, setMateriaid] = React.useState('');//id materia para filtrar unidades

 
  const handleChange = event => {
    setMateriaid(Number(event.target.value) || '');
  };

  const buscarTema =  materiaid => {

let id =  materiaid.target.value;
console.log(id + ' _actual id')
  
  
  
  };




  const manejador = (cc1, cc2, cc3) => {//creador de table
    console.log("imprimiendo....." + tema1X)
    console.log("datos new....." + cc1 + cc2 + cc3)
  };


  const [alumnos, setAlumnos] = React.useState({
    columns: [
      { title: 'Nª', field: 'id', editable: 'never' },
      { title: 'Control', field: 'control', editable: 'never' },
      { title: 'Nombre', field: 'nombre', editable: 'never' },
      {
        title: 'Curso',
        field: 'curso',
        editable: 'never',
        // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
      { title: 'Opcion', field: 'opcion', editable: 'never' },
      { title: 'C1', field: 'c1', },
      { title: 'C2', field: 'c2', },
      { title: 'C3', field: 'c3', },
      { title: '#', field: '#', editable: 'never' },
      {
        title:
          <FormControl variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"

              placeholder={"'" + tema1X + "'"}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              labelWidth={0}
            />

          </FormControl>, field: 'v', with: 2, editable: 'never'
      },
      { title: <input className="inputTemas" placeholder={porcentaje[0].t2}></input>, field: 'vv', editable: 'never' },
      { title: <input className="inputTemas" placeholder={porcentaje[0].t3} ></input>, field: 'vvv', editable: 'never' },
      { title: 'Total', field: '#', editable: 'never' },
    ],
    generalAlumnos
  })

  //

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3 > INSTITUTO TECNOLOGICO SUPERIOR DE LOS RIOS </h3>
        </Grid>
        <Grid item xs={6} sm={3}>
  <Paper elevation={0} className={estilos.paperperiodos}>PERIODO: {dataMateria[0].idnomenclaturaPeriodo}</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.paperperiodos}>CIERRE DE ACTA:</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >xs=12 sm=33</Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.papermaterias}>
            <FormControl variant="outlined" className={estilos.formControl}>
              <InputLabel id="InputLabel">Materia</InputLabel>
              <Select
                labelId="demo-simple-select-outlined"
                id="materia"
                valeu=""
                onChange={buscarTema}
                label="Materia"
              >
         
                {
                  dataMateria.map((materias) => (<MenuItem key={materias.nm} value={materias.idMateria} >{materias.nombre +' ('+ materias.semestre +"/"+ materias.nomenclatura+") "+ materias.nombreCorto}</MenuItem>))
                }

              </Select>
            </FormControl>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper elevation={0} className={estilos.papermaterias}>
            <FormControl variant="outlined" className={estilos.formControl}>
              <InputLabel id="demo-simple-select-outlined-labe">Unidad</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-labe"
                id="unidad"
                label="Unidad"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Matematicas discretas</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>

        </Grid>


        <Grid item xs={12} sm={12}>
          {/*   <Paper > <Paper className={classes.root}>
    <TableContainer className={classes.container}>*/}
          <Paper elevation={3} >
            <MaterialTable
              title="Captura de calificaciones"
              columns={alumnos.columns}//columnas
              data={alumnos.generalAlumnos}//filas

              actions={[
                {
                  icon: 'save',
                  tooltip: 'Save User',
                  onClick: (event, rowData) => alert("You saved " + rowData.control + " c1=" + rowData.c1)
                }
              ]}

              editable={
                {
                  // filsa: rowData => rowData.id === '1',
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      setTimeout(() => {
                        resolve();

                        if (oldData) {
                          console.log(resolve.c1)
                          //actualizacion del estado
                          updateCalificacion(newData)

                          setAlumnos(prevState => {
                            const generalAlumnos = [...prevState.generalAlumnos];//obtenr data
                            console.log(newData.nombre = 'sam')//estado fila modificado
                            console.log(newData.v = (newData.c1 * (porcentaje[0].t1 / 100)))
                            console.log(newData.vv = (newData.c2 * (porcentaje[0].t2 / 100)))
                            console.log(newData.vvv = (newData.c3 * (porcentaje[0].t3 / 100)))

                            console.log(newData)//estado fila modificado

                            generalAlumnos[generalAlumnos.indexOf(oldData)] = newData;
                            // manejador(newData.c1, newData.c2, newData.c3)

                            return { ...prevState, generalAlumnos };
                          });



                        }
                      }, 600);
                    }),

                }
              }

              options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                }
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >*O: Ordinario   *1:Primera oportunidad   *NA: No Alcanza</Paper>
          <Paper >*R: Repeticion   *2:Segunda oportunidad</Paper>
          <Paper >*E: Especial</Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={manejador}
            startIcon={<SaveIcon />}
          >
            Descargar Reporte de Calificaciones
    </Button>

        </Grid>
      </Grid>

    </div>

  );
}

const mapStateToProps = state => ({
  generalAlumnos: state.alumnosState,
  materiasDocentes: state.materias,
  porcentaje: state.porcentaje
})

const mapDispatchToProps = dispatch => ({

  updateCalificacion(calificacionNew) {
    dispatch({
      type: "updateCalificacion",
      calificacionNew
    })
  }


})
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo)