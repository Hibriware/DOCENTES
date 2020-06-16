import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


function ActivarTemas({disabled,isTemas,handleChange}) {
    const _handleChange = event => {
        let values = event.target.checked
        handleChange(values)
      }

    return(
        <FormControlLabel
     disabled={disabled} title="Si activa esta opción habilitará todos los temas (unidades) de este periodo."  control={<Switch checked={isTemas} onChange={_handleChange} name="Activar todos los temas" />}
        label="Activar todos los temas"
      />
    );
}

export default React.memo(ActivarTemas)