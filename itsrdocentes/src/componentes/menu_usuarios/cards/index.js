import React from 'react';
import Cardss from './cards';
import  {dataMateria} from '../../../home';
import BinveniAdmi from '../../administrador/bienvenida'

const Cards = () =>{
console.log(dataMateria)
if(dataMateria){
    return(
        <>

        <ul  style={{display:'flex'}}>
            {dataMateria.map((data , index) =>(
                <li  key={index} style={{display:'inline', marginRight:'3rem'}}>
                    <Cardss clave_materia={data.clave_materia} nombre={data.nombre} modalidad={data.modalidad} semestre={data.semestre} plan={data.plan}/>
                    </li>
            ))}
           
        </ul>
        </>
        );
}else{
    return <BinveniAdmi/>
}

}

export default Cards;