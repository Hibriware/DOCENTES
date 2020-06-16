import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


function Status({isPeriodo,isperiodo=false,isdisabled=true}) {
      console.log(isdisabled)
      const handleChange = event => {
        isPeriodo(event.target.checked );
      }

    return(
        <FormControlLabel
        disabled={isdisabled} control={<Switch checked={isperiodo} onChange={handleChange} name="Activar este periodo" />}
        label="Activar este periodo" title="Esta opción asigna el periodo al módulo Docente calificación."
      />
    );
}

export default React.memo(Status)