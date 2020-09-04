import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from './styles';
import { getCatalogoSemestre } from './servicios/api';


function SelectSemestre({setSemestres,semestres}) {
	const classes = useStyles();

	const [ semestre, seSemestre ] = React.useState([]);

	useEffect(() => {
		async function lista() {
			let res = await getCatalogoSemestre();
			if (res) {
				seSemestre(res);
			} else {
				console.log('error en lista semestre');
			}
		}
		lista();
  }, []);
  
  const _handleChange = (evt) =>{
    setSemestres(evt.target.value)
  }


	return (
		<FormControl size="small" fullWidth variant="outlined" className={classes.formControl}>
			<InputLabel id="demo-simple-select-outlined-labelp">Semestre</InputLabel>
			<Select labelId="demo-simple-select-outlined-labelp" id="demo-simple-select-outlinedp" value={semestres} onChange={_handleChange} label="Semestre">
				{semestre.map((data, index) => (
					<MenuItem key={index} value={data.numsemestre}>
						{data.numsemestre}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default SelectSemestre;
