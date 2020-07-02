import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Materia from './selectMateria';
import Periodos from './selectPeriodo';
import Button from './buttonCarrera';

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

function Carrera() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Paper elevation={0} className={classes.paper}>
						<Materia />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper elevation={0} className={classes.paper}>
						{/*<Periodos />*/}<h4>periodo</h4>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper elevation={0} className={classes.paper}>
						<Button />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default Carrera;
