import React from 'react';
import Button from '@material-ui/core/Button';


export const Buttons = ({ texto = "btn", color = "secondary", onGenerar, ids="enviando id" , idMateriaD ,idPeriodo, idPersonal,infoTeacher }) => {
    const [activo, setActio] = React.useState(false)

    const ejecu = async (e) => {
        e.preventDefault()
        setActio(true)
        await onGenerar(ids,idMateriaD ,idPeriodo, idPersonal,infoTeacher)
        setActio(false)

    }

    return (
        <Button size="small" disabled={activo} variant="contained" onClick={ejecu} color={color}>
            {texto}
        </Button>
    )
}