import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { StyledTableRow, StyledTableCell, useStyles } from './dialogos';


export const TablaAsignacionFecha = (data)=>{
    const classes = useStyles();

    return(
        <div>
            <TableContainer id="tablaMaterias" component={Paper} style={{marginTop:'5px'}} >
              <Table className={classes.table} aria-label="customized table" id="undateTable">
                <TableHead>
                  <TableRow>
                    <StyledTableCell >Save</StyledTableCell>
                    <StyledTableCell align="right"  >Temas</StyledTableCell>
                    <StyledTableCell align="right">Fecha de Evaluacion</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.temasFilas.map((row1, i) => (
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
    );

}