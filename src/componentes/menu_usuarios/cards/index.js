import React, {useContext} from 'react';
import Cardss from './cards';
//import  {dataMateria} from '../../../home';
import BinveniAdmi from '../../administrador/bienvenida'
import {MateriasContext} from "../../Context/ListaMateriaDocente/ContextMaterias";
const Cards = () =>{
    const {stateMateria} =useContext(MateriasContext);
const [{nombreRol}] = JSON.parse(sessionStorage.getItem("resul"))

if(stateMateria.length){
    return(
        <>

        <ul  style={{display:'flex'}}>
            {stateMateria.map((data , index) =>(
                <li  key={index} style={{display:'inline', marginRight:'3rem'}}>
                    <Cardss 
                    clave_materia={data.clave_materia} 
                    nombre={data.nombre}
                     modalidad={data.modalidad}
                     semestre={data.semestre} 
                     plan={data.plan} 
                     carrera={data.nombreCorto}
                     grupo={data.nomenclatura}
                     />
                    </li>
            ))}
           
        </ul>
        </>
        );
}else if(nombreRol==='Jefe académico' || nombreRol==='Jefe academico'){
    return <BinveniAdmi ruta="/admin/report"/>
}else{
    return <BinveniAdmi ruta="/inicio"/>
}

}

export default Cards;
