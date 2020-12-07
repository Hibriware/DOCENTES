import React from "react";

export const MateriasContext = React.createContext({});

export const MateriasProvider=({children})=>{
  const [stateMateria,setStateMateria]=React.useState([]);

    return(
        <MateriasContext.Provider  value={{setStateMateria, stateMateria}}>
            {children}
        </MateriasContext.Provider>
    )
}

