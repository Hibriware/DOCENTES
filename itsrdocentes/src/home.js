import React, { Component, Suspense } from 'react';
import Usuarios from './componentes/menu_usuarios/usuarios'
import { materiasD, getPeriodo } from './componentes/servicios/api';
import LinearProgress from '@material-ui/core/LinearProgress';
export let dataMateria = null;
var caches, bandera;

function CargadeDatos() {

  if (!caches) {
    throw getPeriodo().then(res => {
       caches = res
       bandera = caches
    })
      .catch(dataMateria = 'error')
  }

  if (bandera) {
      throw materiasD().then(data => {
      dataMateria = data
      bandera = null
    })
      .catch(dataMateria = 'error')
  }


  return (
    <div>
      {dataMateria === 'error' ? <h1>API 404 o Actualmente no cuenta con materias asisgnada...</h1> : <Usuarios />}
    </div>
  );
}


export const dataMaterias = async () => {
  dataMateria = await materiasD();
  console.log(dataMateria)
}

export var fecha1 = '2020-02-27', fecha2 = '2020-03-27', fecha3 = '2020-04-27';

class Home extends Component {

  constructor(props) {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <Suspense fallback={
        <LinearProgress />}>
        <CargadeDatos />
      </Suspense>
    )
  }
};

export default Home
