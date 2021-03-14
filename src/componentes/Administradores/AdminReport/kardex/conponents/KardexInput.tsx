import React from "react";
import {TextField} from '@material-ui/core'

const KardexInput = ({onChange}: any) => {
    return <TextField
        style={{marginRight: '5px'}}
        onChange={onChange}
        size={"small"}
        id="outlined-basic"
        label="Numero de control"
        variant="outlined"/>
}


export default KardexInput;
