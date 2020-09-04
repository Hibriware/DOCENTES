import React from 'react';
import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './dialogos';


export const TablaVerTemas =React.memo(({eleccion_temas,fecha1,fecha2,fecha3,fechaFinal}:any) =>{
    const classes = useStyles();

    return(
        <React.Fragment>
 <TableContainer  component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell  > <p style={{fontSize:'12px'}}>Primera entrega:</p><p style={{fontFamily:'fantasy'}}>{moment(fecha1).format('DD-MM-YYYY')}</p></TableCell>
                  <TableCell align="left"><p style={{fontSize:'12px'}}>Segunda entrega:</p><p  style={{fontFamily:'fantasy'}}>{moment(fecha2).format('DD-MM-YYYY')}</p></TableCell>
                  <TableCell align="left"><p style={{fontSize:'12px'}}>Tercera entrega:</p><p  style={{fontFamily:'fantasy'}}>{moment(fecha3).format('DD-MM-YYYY')}</p></TableCell>
                  <TableCell align="left"><p style={{fontSize:'12px'}}>Entrega final:</p><p  style={{fontFamily:'fantasy'}}>{moment(fechaFinal).format('DD-MM-YYYY')}</p></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eleccion_temas.data.map((row:any, i:number) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {row.fecha_limite <= fecha1 ? row.tema1_nombre : '--'}
                    </TableCell>
                    <TableCell align="right">{row.fecha_limite > fecha1 && row.fecha_limite <= fecha2 ? row.tema1_nombre : '--'}</TableCell>
                    <TableCell align="right">{row.fecha_limite > fecha2 && row.fecha_limite <= fecha3 ? row.tema1_nombre : '--'}</TableCell>
                    <TableCell align="right">{row.fecha_limite > fecha3 && row.fecha_limite < fechaFinal ? row.tema1_nombre : '--'}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
          </TableContainer>
        </React.Fragment>
    );
}); 