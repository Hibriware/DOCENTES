import React , { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import './calificaciones.css';
 
var arreglo=[];
var temaX1,temaX2,temaX3;

const columns = [
  { id: 'n', label: 'N°', minWidth: 70 },
  { id: 'numeroControl', label: 'N° de control', minWidth: 100 },
  {
    id: 'nombre_alumn',
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
    id: 'tema1',
    label: 'c1',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'tema2',
    label: 'c2',
    minWidth: 70,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'tema3',
    label: 'c3',
    minWidth: 70,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: '_',
    label: '___',
    minWidth: 40,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: '-',
    label:  <input className="inputTemas" value={temaX1} />,//c1
    minWidth: 40,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: '--',
    label: <input className="inputTemas" value="3" />,//c2
    minWidth: 40,
    
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: '---',
    label: <input className="inputTemas" value="30" />,//c3
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


function createData(n, numeroControl, nombre_alumn, curso,opcion,tema1db,tema2db,tema3db) {

  const tema1 = <input className="inputTemas" value={tema1db} />
  const tema2 = <input className="inputTemas" value={tema2db} />
  const tema3 = <input className="inputTemas" value={tema3db} />
  //const density = population / size;
 // const tema1 = <input type="numbre" />
  return { n, numeroControl,  nombre_alumn, curso,opcion,tema1,tema2,tema3 };
}

const rowsDatos = [
  createData('1', '14E20307', 'SAMUEL RIVAS GARCIA','ESCOLARIZADO', 'O','90','80','900'),
  createData('2', '14E20301', 'JOSE BARRALES JIMENEZ HENANDES','ESCOLARIZADO', 'O','70','100','90'),
  createData('3', '14E20302', 'BIRUETA HERNANDEZ GARCIA DE LA CRUZ','ESCOLARIZADO', 'O','80','60','90'),
  createData('4', '14E20303', 'DANY CAMBRANOS ARCOZ','ESCOLARIZADO', 'O','80','90','30'),
  createData('5', '14E20304', 'JELIPE CALDERON INOJUSA','ESCOLARIZADO', 'O','80','50','90'),
  createData('6', '14E20305', 'MICHIS ALEJANDRO TRINIDAD','ESCOLARIZADO', 'O','80','100','90'),
  
];

var data = [{
  id:'1',
  nombre:'ing samu',
  tema1:'32',
  tema2:'40',
  tema3:'50'

}];

const sStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});




 

  

export default function StickyHeadTable() {
  const manejador =() => {

    temaX1= arreglo[0].tema1;
  
    console.log(arreglo[0].nombre)
  
  console.log("imprimiendo.....")
  
  
  };

  useEffect(()=>{
  
  //  setPorcentaje();
    arreglo=porcentaje;
    console.log("lo primero que se v")
    console.log(porcentaje);

temaX1= arreglo[0].tema1;
console.log(temaX1 + "sin datos")
   
  });
  
  
  const classes = sStyles();
  const [porcentaje,setPorcentaje] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    


  return (
      <div>
          <Grid container spacing={3}>
          <Grid item xs={12}>
          <Paper > INSTITUTO TECNOLOGICO SUPERIOR DE LOS RIOS</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >Cnponente1</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper >libre</Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper > <Paper className={classes.root}>
      <TableContainer className={classes.container}>
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
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/*fin cabezera*/}

{/*inicio table body*/}
          <TableBody>
            {rowsDatos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.n}>
                  
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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