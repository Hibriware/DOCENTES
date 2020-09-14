import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getListaPeriodo } from '../servicios/api';

function SelectPeriodo({setPeriodo,idPeriodo}) {
	const [ periodos, setPeriodos ] = React.useState([]);

	useEffect(() => {
		async function lista() {
			let res = await getListaPeriodo();
			if (res) {
				setPeriodos(res);
			} else {
				console.log('error en lista periodo');
			}
		}
		lista();
  }, []);
  
  const _handleChange = (evt) =>{
    setPeriodo(evt.target.value)
  }


	return (
		<FormControl fullWidth size="small" variant="outlined" >
			<InputLabel id="demo-simple-select-outlined-labelp">Periodo</InputLabel>
			<Select labelId="demo-simple-select-outlined-labelp" id="demo-simple-select-outlinedp" value={idPeriodo} onChange={_handleChange} label="Periodo">
				{periodos.map((PERIODO, index) => (
					<MenuItem key={index} value={PERIODO.idnomenclaturaPeriodo}>
						{PERIODO.rango}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default SelectPeriodo;
