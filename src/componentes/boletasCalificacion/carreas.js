import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Materia from './selectMateria';
import Periodos from './selectPeriodo';
import Button from './buttonCarrera';
import Semestre from './selectSemestre';

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

function Carrera({setLoader}) {

	const classes = useStyles();
	const [periodo, setPeriodo] = React.useState('');
	const [idDcarreras, setIdCarrera] = React.useState('');
	const [semestres, setSemestres] = React.useState('');

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<Paper  component={'div'} elevation={0} className={classes.paper}>
						<Materia setIdCarrera={setIdCarrera}  idDcarreras={idDcarreras}/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper elevation={0} className={classes.paper}>
						<Periodos setPeriodo={setPeriodo} idPeriodo={periodo} />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper elevation={0} className={classes.paper}>
						<Semestre setSemestres={setSemestres} semestres={semestres} />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper elevation={0} className={classes.paper}>
						No disponible
						{/*<Button periodo={periodo} idDcarreras={idDcarreras} semestres={semestres}
								 setLoader={setLoader}/>*/}
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Carrera;
