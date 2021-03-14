import React from "react";
import axios from "axios";

export const usePeriodoActivo = () => {
    const [periodo, setPeriodo] = React.useState();
    React.useEffect(() => {
        axios.get('/api/reporte/consultar/periodo-activo')
            .then((res) => {
                setPeriodo(res.data[0])
            }).catch((err) => console.log(err))
    }, [])

    return {
        periodo,
    }
}
