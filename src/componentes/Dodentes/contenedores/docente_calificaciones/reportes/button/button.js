import React, {useContext} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {MateriasContext} from "../../../../../../Context/ListaMateriaDocente/ContextMaterias";
import {PeriodoMateriasContext} from "../../../../../../Context/PeriodoMateria/ContextPeriodosMateria";


export const Buttons = ({texto = "btn", color = "secondary", onGenerar, ids = "enviando id"}) => {
    const {stateMateria, setStateMateria} = useContext(MateriasContext);
    const [statePeriodoMateria] = useContext(PeriodoMateriasContext);
    const [activo, setActio] = React.useState(false)

    const ejecu = async (e) => {
        e.preventDefault()
        setActio(true)
        await onGenerar(ids, stateMateria, statePeriodoMateria?.data[0])
        setActio(false)

    }

    return (
        <Tooltip title={'Se descargarán todas las listas.'}>
            <Button size="small" disabled={activo} variant="contained" onClick={ejecu} color={color}>
                {texto}
            </Button>
        </Tooltip>
    )
}
