import React from "react";
import CardAgregar from './cardAgregar';
import CardEditar from './cardEditar';
import './agregarServicio.css';

function AgregarServicio({setActualizar,actualizar,concepto, setLoader}) {

  return (
    <div className='box-agregar-servicio'>
      <div className='box-cardAgregar' >
      <CardAgregar actualizar ={actualizar} setActualizar={setActualizar} concepto={concepto} setLoader={setLoader} />
      </div>
      <div className='box-cardEditar'>
      <CardEditar actualizar ={actualizar} setActualizar={setActualizar}  concepto={concepto} setLoader={setLoader} />
      </div>
    </div>
  );
}

export default AgregarServicio;
