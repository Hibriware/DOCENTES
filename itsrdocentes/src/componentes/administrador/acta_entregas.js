import 'date-fns';
import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { Btn_evaluar } from './funciones';
import { useStyles } from './styles';
import { EXISTNCIA_ACTA } from '../servicios/api';
import {FechaDate} from './dates'




const Entregas = () => {

    const classes = useStyles();
    const fecha_Defaul = moment(new Date()).format('YYYY-MM-DD, h:mm:ss a');
    const [entrega1, setEntrega1] = React.useState(fecha_Defaul);
    const [entrega2, setEntrega2] = React.useState(fecha_Defaul);
    const [entrega3, setEntrega3] = React.useState(fecha_Defaul);
    const [entregaFinal, setFinal] = React.useState(fecha_Defaul);
    const [status, setStatus] = React.useState(false);


    useEffect(() => {
        function statusDate() {
            if (EXISTNCIA_ACTA) {
                setStatus(true)
            }
        }

        statusDate()
    }, [])



    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>CALENDARIO DE ENTREGA DE CALIFICACIONES</h3>
            <div className={classes.root}>
                <Card elevation={3}>
                <React.Fragment>
                    <CssBaseline />
                    <Container >
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4} >
                                <Paper className={classes.paper} elevation={0} >
                                <FechaDate entrega ={entrega1}  status={status} onGuardar={date => setEntrega1(date)} info="Primera entrega" />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Paper className={classes.paper} elevation={0}>
                                <FechaDate entrega ={entrega2}  status={status} onGuardar={date => setEntrega2(date)} info="Segunda entrega" />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Paper className={classes.paper} elevation={0}>
                                <FechaDate entrega ={entrega3}  status={status} onGuardar={date => setEntrega3(date)} info="Tercera entrega" />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper} elevation={0}>
                                <FechaDate entrega ={entregaFinal}  status={status} onGuardar={date => setFinal(date)} info="Entrega Final" />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper} >
                                    <Btn_evaluar
                                        primera={entrega1}
                                        segunda={entrega2}
                                        tercera={entrega3}
                                        final={entregaFinal} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </React.Fragment>
                </Card>
            </div>
        </div>
    );
}
export default Entregas