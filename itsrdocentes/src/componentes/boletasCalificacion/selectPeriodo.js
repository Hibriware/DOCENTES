import React,{useEffect} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useStyles} from './styles';
import {getListaPeriodo,dataListaPeriodo} from '../servicios/api';

function SelectPeriodo() {
  const classes = useStyles();

  const[periodos,setPeriodos] = React.useState([]);

  useEffect(() => {
      async function lista(){
        let res =  await getListaPeriodo()
        console.log(res)
        if(res){
          setPeriodos(res)
        }else{
            console.log("error en lista periodo")
        }
      }
      lista()
  }, [])


    return(
      <FormControl size="small" variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-labelp">Periodo</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-labelp"
        id="demo-simple-select-outlinedp"
        
        label="Age"
      >
       {
         periodos.map((PERIODO,index) => (
          <MenuItem key={index} value={PERIODO.idnomenclaturaPeriodo}>{PERIODO.rango}</MenuItem>
         ))
       }
      </Select>
    </FormControl>
    )
    
}

export default SelectPeriodo;