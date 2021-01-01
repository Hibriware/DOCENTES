import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Periodo from './selectPeriodo';
import TextField from '@material-ui/core/TextField';
import ButtonPdf from './buttonAlumno';
//import Semestre from './selectSemestre';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

function Alumno({setLoader}) {
	const classes = useStyles();
	const [periodo, setPeriodo] = React.useState('');
	const [control, setControl] = React.useState({control:''});
	//const [semestres, setSemestres] = React.useState('');


		const hanledChange = (evt) =>{
			setControl({
				...control, 
				control:evt.target.value
			})

		}

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4}>
					<Paper component={'div'} className={classes.paper} elevation={0} >
					<TextField fullWidth size="small" id="outlined-basic" value={control.control} onChange={hanledChange} label="NºControl" variant="outlined" />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4} >
					<Paper component={'div'} className={classes.paper} elevation={0}>
					<Periodo setPeriodo={setPeriodo} idPeriodo={periodo}/>
					</Paper>
				</Grid>
				{/*<Grid item xs={12} sm={4}>
					<Paper component={'div'} className={classes.paper} elevation={0}>
						<Semestre semestres={semestres} setSemestres={setSemestres}/>
					</Paper>
				</Grid>*/}
				<Grid item xs={6} >
					<Paper component={'div'} className={classes.paper} elevation={0}>
					<ButtonPdf setLoader={setLoader} idPeriodo={periodo} idControl={control.control}/>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Alumno;
