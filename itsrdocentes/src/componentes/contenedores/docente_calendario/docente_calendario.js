import React from 'react';
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

function createData1(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows1 = [
  createData1(<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 1', <input type="date" />),
  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 2', 'data'),
  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 3', 'data'),
  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 4', 'data'),
  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 5', 'data'),
  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 6', 'data'),

  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 7', 'data'),

  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 8', 'data'),
  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 9', 'data'),

  createData1(<Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />, 'Tema 10', 'data'),


];

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  formControl: {

    minWidth: 180,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {/* inicio materias lista*/}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Materia</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"

            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          {/* fin materias lista*/}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Save</StyledTableCell>
                  <StyledTableCell align="right">Temas</StyledTableCell>
                  <StyledTableCell align="right">Fecha de Evaluacion</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows1.map(row1 => (
                  <StyledTableRow key={row1.name}>
                    <StyledTableCell component="th" scope="row">
                      {row1.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row1.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row1.fat}</StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
          {/*fin tabla temas*/}
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>DOCENTE:</h2>
          {/*listas de temas */}
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Primera entrega:</TableCell>
                  <TableCell align="right">Segunda entrega:</TableCell>
                  <TableCell align="right">Tercera entrega:</TableCell>

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