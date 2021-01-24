import React, { useEffect} from "react";
import axios from 'axios';
export const PeriodoMateriasContext = React.createContext();

export const PeridoMateriasProvider=({children})=>{
    const [statePeriodoMateria,setStatePeriodoMateria]=React.useState();
    const [periodoLoader,setPeriodoLoader]=React.useState(true);
    let isPeriodo;
    useEffect(()=>{
        axios(`/api/administrador/lista/periodo/contex`)
          .then((res)=> {
              setStatePeriodoMateria(res.data)
              isPeriodo = res.data?.data?.length ? true:false;
              setPeriodoLoader(isPeriodo)
          })
          .catch((error)=> {
              console.log(error)
              setPeriodoLoader(false)
          })
    },[])


    return(
        <PeriodoMateriasContext.Provider  value={[statePeriodoMateria, setStatePeriodoMateria,periodoLoader]}>
            {children}
        </PeriodoMateriasContext.Provider>
    )
}

