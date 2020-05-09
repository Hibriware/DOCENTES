import React from 'react';
import Button from '@material-ui/core/Button';
import './styles.css'

 const Noencontrado =({onAuthChange, onGenerar,resetear})=>{
const _onGenerar=(e)=>{
    e.preventDefault()
    onGenerar()
    resetear()
}

    return(<div className="notfound-bg" style={{textAlign:'center'}}>
        <strong style={{display:'block'}}>No cuenta con materias asignadas en el actual periodo </strong>
        <Button style={{marginTop:6}} size="small" variant="outlined" onClick={_onGenerar}>Login</Button>
          </div>
    );
}
export default Noencontrado;