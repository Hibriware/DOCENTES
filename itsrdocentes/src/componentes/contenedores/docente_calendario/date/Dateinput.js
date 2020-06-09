import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export  const FechaDate = (data) => {
const {setValue, onGuardar,info } =  data;

const _guardarState=(e)=>{
   
    console.log(setValue )
  onGuardar(moment(e).format('YYYY-MM-DD'))
}

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
    <Grid container justify="space-around">
    <KeyboardDatePicker
          //disableToolbar
        //  variant="inline"
        size="small"
          format="dd/MM/yyyy"
          margin="none"
          id="date-picker-dialog"
          value={setValue}
          onChange={_guardarState}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </Grid>
  </MuiPickersUtilsProvider>
  );
}