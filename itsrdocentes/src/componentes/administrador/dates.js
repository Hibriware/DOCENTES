import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



export  const FechaDate = (data) => {
const {status,entrega, onGuardar,info } =  data;

const _guardarState=(e)=>{
  onGuardar(e)
}

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
    <Grid container justify="space-around">
        <KeyboardDatePicker
            disabled={status}
            margin="normal"
            id="date-picker-dialog"
            label={info}
            format="dd/MM/yyyy"
            value={entrega}
            onChange={_guardarState}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }} />
    </Grid>
  </MuiPickersUtilsProvider>
  );
}