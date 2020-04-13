import 'date-fns';
import React from 'react';
import { useStyles } from './styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {Btn_evaluar} from './funciones';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';





const Entregas = () => {

    const classes = useStyles();
    const fecha_Defaul = new Date('2020-01-01T21:11:54');
    const [entrega1, setEntrega1] = React.useState(fecha_Defaul);
    const [entrega2, setEntrega2] = React.useState(fecha_Defaul);
    const [entrega3, setEntrega3] = React.useState(fecha_Defaul);
    const [entregaFinal, setFinal] = React.useState(fecha_Defaul);

    return (
        <div>
<h3 style={{textAlign:'center'}}>CALENDARIO DE ENTREGA DE CALIFICACIONES</h3>
            <div className={classes.root}>
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="sm" style={{ maxWidth:'fit-content'}}>
                        <Grid container spacing={5}>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Primera entrega"
                                                format="MM/dd/yyyy"
                                                value={entrega1}
                                                onChange={date => setEntrega1(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Segunda entrega"
                                                format="MM/dd/yyyy"
                                                value={entrega2}
                                                onChange={date => setEntrega2(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Tercera entrega"
                                                format="MM/dd/yyyy"
                                                value={entrega3}
                                                onChange={date => setEntrega3(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}> 
                                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Entrega Final"
                                                format="MM/dd/yyyy"
                                                value={entregaFinal}
                                                onChange={date => setFinal(date)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                <Btn_evaluar primera={entrega1} segunda={entrega2} tercera={entrega3} final={entregaFinal} />
                            </Paper>
                            </Grid>
                        </Grid>


                    </Container>
                </React.Fragment>
            </div>
        </div>
    );
}
export default Entregas