import React,{useEffect} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {getListaPeriodo,dataListaPeriodo} from '../servicios/api';



function Lista_Periodo({onBuscar}) {
    const[periodos,setPeriodos] = React.useState([]);

    useEffect(() => {
        async function lista(){
          let res =  await getListaPeriodo()
          if(res){
            setPeriodos(res)
          }else{
              console.log("error en lista periodo")
          }
        }
        lista()
    }, [])

    const _buscar = async (evt)=>{
        if(evt.target.value){
          console.log('buscar....')
          console.log(evt.target.value)
         await onBuscar(evt.target.value)
        }
    }

    return(
        <FormControl style={{width:132}}>
        <InputLabel  id="demo-customized-select-label">Periodos</InputLabel>
        <Select style={{width:132}}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={periodos.rango}
          onClick={_buscar}
        >

          
         {
             periodos.map((data, i) => (
                    <MenuItem value={data.idnomenclaturaPeriodo}>{data.rango}</MenuItem>
             ))
         }
        </Select>
      </FormControl>
    );
}

export default Lista_Periodo;