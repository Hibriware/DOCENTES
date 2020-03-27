import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
//import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import './calificaciones.css';
//vriables
import { tema1X, tema2X, tema3X, porcentajeActual, dataAlumnos } from './clase_principal_calificaciones';

var arreglo = [], mN, varia = "98";
console.log(tema1X + "expor...")
export var areglo2 = "wwww";




function createData(id, control, nombre_alumn, curso, opcion, tema1db, tema2db, tema3db) {

  const tema1 = <input className="inputTemas" value={tema1db} />
  const tema2 = <input className="inputTemas" value={tema2db} />
  const tema3 = <input className="inputTemas" value={tema3db} />
  //const density = population / size;
  // const tema1 = <input type="numbre" />
  return { id, control, nombre_alumn, curso, opcion, tema1, tema2, tema3 };
}
async function enviarData() {

  for (let index = 0; index < dataAlumnos.length; index++) {
    const n = dataAlumnos[index].id;
    const numeroControl = dataAlumnos[index].control;
    const nombre = dataAlumnos[index].nombre;
    const curso = dataAlumnos[index].curso;
    const opcion = dataAlumnos[index].opcion;
    const c1 = dataAlumnos[index].c1;
    const c2 = dataAlumnos[index].c2;
    const c3 = dataAlumnos[index].c3;
    createData(n, numeroControl, nombre, curso, opcion, c1, c2, c3);
    console.log(n, numeroControl, nombre, curso, opcion, c1, c2, c3)
  }

}

const rowsDatos = [
  createData('1', '14E20307', 'SAMUEL RIVAS GARCIA', 'ESCOddLARIZADO', 'O', '90', '80', '900'),
  createData('2', '14E20301', 'JOSE BARRALES JIMENEZ HENANDES', 'ESCOLARddIZADO', 'O', '70', '100', '90'),
  createData('3', '14E20302', 'BIRUETA HERNANDEZ GARCIA DE LA CRUZ', 'ESddCOLARIZADO', 'O', '80', '60', '90'),
  createData('4', '14E20303', 'DANY CAMBRANOS ARCOZ', 'ESCOddLARIZADO', 'O', '80', '90', '30'),
  createData('5', '14E20304', 'JELIPE CALDERON INOJUSA', 'ESCOLARIddZADO', 'O', '80', '50', '90'),
  createData('6', '14E20305', 'MICHIS ALEJANDRO TRINIDAD', 'ESCOLddARIZADO', 'O', '80', '100', '90'),

];


/*const sStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
*/
export default function StickyHeadTable() {

  var columns = [
    {
      id: 'id',
      label: 'N°',
      minWidth: 70
    },
    {
      id: 'control',
      label: 'N° de control',
      minWidth: 100
    },
    {
      id: 'nombre',
      label: 'Nombre Completo del Alumno',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString(),
    },
    {
      id: 'curso',
      label: 'Curso',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString(),
    },
    {
      id: 'opcion',
      label: 'Opcion',
      minWidth: 90,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'c1',
      label: 'c1',
      minWidth: 100,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'c2',
      label: 'c2',
      minWidth: 70,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'c3',
      label: 'c3',
      minWidth: 70,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'accion',
      label: 'accion',
      minWidth: 40,
      align: 'right',
      
    },
    {
      id: 'v',
      input: <input className="inputTemas" value={tema1X}></input>,//c1
      minWidth: 40,
      align: 'right',

    },
    {
      id: 'vv',
      input: <input className="inputTemas" value={tema2X} ></input>,//c2
      minWidth: 40,

      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: 'vvv',
      input: <input className="inputTemas" value={tema3X} ></input>,//c3
      minWidth: 40,
      align: 'right',
      format: value => value.toFixed(2),
    },
    {
      id: '----',
      label: 'TOTAL',
      minWidth: 40,
      align: 'right',
      format: value => value.toFixed(2),
    },
  ];

//porcentajeActual()

  const manejador = () => {//creador de table

    console.log("imprimiendo....." + tema1X)
    setTemas1(temas1 + 1)
    mN = temas1 ;
    console.log(temas1 +'temas')
  };

  useEffect(() => {

  });

  const editPersonal = (id,c1p,c2p,c3p) =>{//inicio
    porcentajeActual()
 //operaciones
 console.log(temas1+ 'valor de temas1...')
 let v1resuelto = c1p * (tema1X/100);
 let v2resuelto = c2p * (tema2X/100);
 let v3resuelto = c2p *(tema3X/100);

setResc1(v1resuelto);
setResc2(v2resuelto);
setResc3(v3resuelto);
    console.log("c1 ==" + v1resuelto)
    console.log("c2 ==" + v2resuelto)

    console.log("c3 ==" + v3resuelto)

    console.log(id)
    console.log(c1p +' _'+c2p+'_ '+c3p)

  }//fin

  //const classes = sStyles();
  const [temas1, setTemas1] = React.useState(0);

  const [porcentaje, setPorcentaje] = React.useState();
  //estados
  const [alumnos, setAlumnos] = React.useState(dataAlumnos);
  //resultado de (cx(vx/100))
  const [resC1, setResc1] = React.useState();
  const [resC2, setResc2] = React.useState();
  const [resC3, setResc3] = React.useState();
  //nuevo date
const [newresC1,setNewc1]=React.useState(0)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = event =>{
    
    setAlumnos(event.target.value);
    console.log(alumnos);
  }
  

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper > INSTITUTO TECNOLOGICO SUPERIOR DE LOS RIOS {temas1}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >Cnponente1</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >libre</Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/*   <Paper > <Paper className={classes.root}>
      <TableContainer className={classes.container}>*/}
          <Paper > <Paper >
            <TableContainer >
              <Table stickyHeader aria-label="sticky table">
                {/*inicio cabezera*/}
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                        {column.input}

                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {/*fin cabezera*/}

                {/*inicio table body*/}
                <TableBody>
                  {alumnos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>

                        {columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value

                                && column.id === 'c1' ?  <TextField id="outlined-basic" label={row.c1} variant="outlined" /> : value
                                  && column.id === 'c2' ? <input className="inputTemas" value={row.c2}></input> : value
                                    && column.id === 'c3' ? <input className="inputTemas" value={row.c3}></input> : value

                                    && column.id === 'accion' ? <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>editPersonal(row.id,row.c1,row.c2,row.c3)}> <SaveIcon /> </IconButton> : value

                                      && column.id === 'v' ? <input className="inputTemas" value={resC1} ></input> : value
                                        && column.id === 'vv' ? <input className="inputTemas" value={resC2}></input> : value
                                          && column.id === 'vvv' ? <input className="inputTemas" value={resC3} ></input> : value
                                          


                              }


                            </TableCell>
                          );
                        })}

                      </TableRow>
                    );
                  })}
                </TableBody>
                {/*fin table body*/}

              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={rowsDatos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
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