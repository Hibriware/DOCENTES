import React, {useEffect, useState} from "react";
import axios from 'axios'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



const CarrerasLista =({listaCarrera,setListaCarrera}:any)=>{
    const[state,setState]=useState([]);
    useEffect(()=>{
        axios.get('/api/reporte/consultar/listas-departamento-carrera')
            .then((res)=>{
                setState(res.data)
            }).catch(error=>console.log(error))
    },[]);

    const _handleChange=(evt:any)=>{
        setListaCarrera(evt.target.value)
    }
    return(
        <FormControl fullWidth size="small" variant="outlined" style={{width:'200px'}} >
            <InputLabel id="demo-simple-select-outlined-labelp">Carreras</InputLabel>
            <Select labelId="demo-simple-select-outlined-labelp" id="demo-simple-select-outlinedp" value={listaCarrera} onChange={_handleChange} label="Carreras">
                {state.map((item:any, index:number) => (
                    <MenuItem key={index} value={item.idCarrera}>
                        {item.nombreCorto}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>)
}

export default CarrerasLista;
