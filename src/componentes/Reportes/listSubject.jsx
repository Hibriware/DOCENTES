import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { list_subject } from "./constants/end-points";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop:theme.spacing(2)
    //minWidth: 200,
  },
  
}));

function Subject({ idPeriodo, idPersonal,idMateriaD,setIdMateriaD }) {
  const classes = useStyles();
  const [ListSubjects, setSubject] = React.useState([]);

  const SearhSubject = React.useMemo(()=>{
  idPeriodo?.idnomenclaturaPeriodo && idPersonal &&  Axios.get(list_subject,{
        params:{
            periodo:idPeriodo.idnomenclaturaPeriodo,
            idPersonal:idPersonal?.value
        }
    }).then(data=>setSubject(data.data)).catch(err=>console.log(err))
  },[idPeriodo,idPersonal])

 

  return (
    <FormControl size="small" fullWidth variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Materia</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={idMateriaD}
        onChange={(evt) => setIdMateriaD(evt.target.value)}
        label="Periodo"
      >
        {ListSubjects.map((_subject, i) => (
          <MenuItem key={i} value={_subject}>
            {`${_subject.nomcorto}/ Grupo:${_subject.semestre} ${_subject.nomenclatura}/${_subject.carrera}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Subject;