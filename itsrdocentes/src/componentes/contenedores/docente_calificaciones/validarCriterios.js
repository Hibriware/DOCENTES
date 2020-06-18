import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));

function ValidarCriterios() {
	const classes = useStyles();

	const aprobar = (evt) => {
		let max = 100;
	};

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<TextField
				type="number"
				name="c1"
				maxLength="2"
				id="filled-basic1"
				label="C1"
				variant="filled"
				onInput={(e) => {
					e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2);
				}}
				min={0}
				
			/>
			<TextField
				type="number"
				name="c2"
				id="filled-basic2"
				label="C2"
				variant="filled"
				onInput={(e) => {
					e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2);
				}}
				min={0}
			/>
			<TextField
				type="number"
				name="c3"
				id="filled-basic3"
				label="C3"
				variant="filled"
				onInput={(e) => {
					e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2);
				}}
				min={0}
			/>
			<TextField
				type="number"
				name="c4"
				id="filled-basic4"
				label="C4"
				variant="filled"
				onInput={(e) => {
					e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2);
				}}
				min={0}
			/>
		</form>
	);
}

export default React.memo(ValidarCriterios);
