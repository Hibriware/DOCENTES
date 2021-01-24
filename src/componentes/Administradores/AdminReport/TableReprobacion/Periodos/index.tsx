import React, {useEffect, useState} from "react";
import axios from 'axios'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const Periodos =({listaPeriodo,setListaPeriodo}:any)=>{
    const[state,setState]=useState([]);
    useEffect(()=>{
        axios.get('/api/administrador/lista/periodo')
            .then((res)=>{
                setState(res.data)
            }).catch(error=>console.log(error))
    },[]);

    const _handleChange=(evt:any)=>{
        setListaPeriodo(evt.target.value)
    }
return(
    <FormControl fullWidth size="small" variant="outlined" style={{width:'368px'}} >
        <InputLabel id="demo-simple-select-outlined-labelp">Periodo</InputLabel>
        <Select labelId="demo-simple-select-outlined-labelp" id="demo-simple-select-outlinedp" value={listaPeriodo} onChange={_handleChange} label="Periodo">
            {state.map((PERIODO:any, index:number) => (
                <MenuItem key={index} value={PERIODO.idnomenclaturaPeriodo}>
                    {PERIODO.rango}
                </MenuItem>
            ))}
        </Select>
    </FormControl>)
}

export default Periodos;
