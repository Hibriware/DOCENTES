import React from 'react';
import 'date-fns';

import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
//import Calendar from './calendar';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function SimpleContainer() {
   
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      
   <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Primera entrega"
          format="MM/dd/yyyy"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Segunda entrega"
          format="MM/dd/yyyy"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Tercera entrega"
          format="MM/dd/yyyy"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
       
       {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />*/} 
      </Container>
    </React.Fragment>
  );
}