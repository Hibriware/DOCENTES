import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function SelectMateria() {

    return(
        <FormControl title="Seleccione un periodo para editarlo." style={{width:132}}>
        <InputLabel id="demo-customized-select-label">Materias</InputLabel>
        <Select style={{width:132}}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
        >
                    <MenuItem ></MenuItem>
        </Select>
      </FormControl>
    )
    
}

export default SelectMateria;