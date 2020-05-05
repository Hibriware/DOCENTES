import React, { Component, Suspense } from 'react';
import {BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom';
import Usuarios from './componentes/menu_usuarios/usuarios';
import Login from './login/login'
import PageError from './componentes/404'
import { materiasD, getPeriodo } from './componentes/servicios/api';
import LinearProgress from '@material-ui/core/LinearProgress';
import Loader from './login/cargaDedatos';
import AuthService from './componentes/servicios/AuthService';
import App from './App'
export var dataMateria =null, ID_USUARIO = 0;
export var caches, bandera,perio;

export const resetear =()=>{
  caches = null
  dataMateria=null
}

function CargadeDatos(data) {
 
  console.log(' daTA')
  console.log("--------------------------")
  console.log(data)
  console.log(caches)
  console.log(dataMateria )
  console.log("--------------------------")


  console.log(data.data[0].nombreRol)
let roles = data.data[0].nombreRol;
ID_USUARIO = data.data[0].usuarioID;
//validar la ruta
if(roles === 'Administrador'){//inicio
  if (!caches) {
    throw getPeriodo().then(res => {
       caches = res
       perio = false
    }).catch(perio = true)
  }
//fin
return (
<>
{ perio ? <h3>sin informacion disponible</h3> :<Usuarios onAuthChange={data.onAuthChange} resetear={resetear} />}
</>)

}else if(roles === 'Docente'){//inicio
  console.log('Docente Docente Docente')
  if (!caches) {
    throw  getPeriodo().then(res => {
       caches = res
       bandera = caches
    }).catch(dataMateria = 'error')
  }

  if (bandera) {
    console.log('dataMateria 2')

      throw materiasD().then(data => {
      dataMateria = data
      bandera = null
      console.log(dataMateria)
    }).catch(dataMateria = 'error')
    
  }

return (
  <>
  { perio ? <h3>sin informacion disponible</h3> : dataMateria ==='error' ? <PageError onAuthChange={data.onAuthChange} onGenerar={data.logout} resetear={resetear}/>: <Usuarios onAuthChange={data.onAuthChange} resetear={resetear}/>}
  </>
)}//fin

  /*return (
    <div>
      {dataMateria === 'error' ? <h1>API 404 o Actualmente no cuenta con materias asisgnada...</h1> : <Usuarios />}
    </div>
  );*/
}


export const dataMaterias = async () => {
  dataMateria = await materiasD();
  console.log(dataMateria)
}

//export var fecha1 = '2020-02-27', fecha2 = '2020-03-27', fecha3 = '2020-04-27';

class Home extends Component {

  constructor(props) {
    super();
    this.AuthService = new AuthService();
    this.logout=this.logout.bind(this);
    
    this.state = {
    }
  }

  render() {
    const n = this.AuthService.getUser();
    return (<>
    
      <Suspense fallback={ <Loader />}>
        <CargadeDatos data={n} onAuthChange={this.props.onAuthChange} logout={this.logout} />
      </Suspense>
</>    )
  }
  logout(){
    this.AuthService.logout();
    this.props.onAuthChange();
  }
};

export default Home
