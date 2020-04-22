import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useStyles } from './dialogos';


export const TablaVerTemas = (data) =>{
    const classes = useStyles();

    return(
        <div>
 <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell><p style={{fontSize:'12px'}}>Primera entrega:</p><p style={{fontFamily:'fantasy'}}>{data.fecha1}</p></TableCell>
                  <TableCell align="left"><p style={{fontSize:'12px'}}>Segunda entrega:</p><p  style={{fontFamily:'fantasy'}}>{data.fecha2}</p></TableCell>
                  <TableCell align="left"><p style={{fontSize:'12px'}}>Tercera entrega:</p><p  style={{fontFamily:'fantasy'}}>{data.fecha3}</p></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.eleccion_temas.data.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {row.fecha_limite <= data.fecha1 ? row.tema1_nombre : '--'}
                    </TableCell>
                    <TableCell align="right">{row.fecha_limite > data.fecha1 && row.fecha_limite <= data.fecha2 ? row.tema1_nombre : '--'}</TableCell>
                    <TableCell align="right">{row.fecha_limite > data.fecha2 && row.fecha_limite <= data.fecha3 ? row.tema1_nombre : '--'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
          </TableContainer>
        </div>
    );
}  