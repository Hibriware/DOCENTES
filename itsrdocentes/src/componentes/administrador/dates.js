import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



export  const FechaDate = (data) => {
const {status,entrega, onGuardar,info } =  data;
console.log(status)
const _guardarState=(e)=>{
  onGuardar(e)
}

  return (
    <MuiPickersUtilsProvider locale={deLocale}  utils={DateFnsUtils} >
    <Grid container justify="space-around">
        <KeyboardDatePicker
            defaultValue="2017-05-24T10:30"
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