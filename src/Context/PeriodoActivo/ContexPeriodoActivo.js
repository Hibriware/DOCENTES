import React,{createContext} from "react";
import {usePeriodoActivo} from '../../hooks/usePeriodoActivo';
export const PeriodoActivoContex = createContext();

export const PeridoActivoProvider =({children})=>{
const {periodo} = usePeriodoActivo();
    return(
        <PeriodoActivoContex.Provider value={{periodo}}>
            {children}
    </PeriodoActivoContex.Provider>)
}
