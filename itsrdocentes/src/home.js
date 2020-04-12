import React, { Component, Suspense } from 'react';
import TabsWrappedLabel from './componentes/menu_opciones';
import { materiasD, dataPeriodo, getPeriodo } from './componentes/servicios/api';
import LinearProgress from '@material-ui/core/LinearProgress';
export let dataMateria = null;

var caches, bandera;

function CargadeDatos() {

  if (!caches) {
    /*    console.log(dataMateria + " ..1")
        throw materiasD().then(data => {dataMateria = data
        getPeriodo()
        })
          .catch(dataMateria = 'error')
    */
    console.log(dataMateria + " ..1")
    throw getPeriodo().then(res => {
      caches = res
      bandera = caches
    })
      .catch(dataMateria = 'error')
  }

  if (bandera) {
    console.log("solisitar personal")
    throw materiasD().then(data => {
      dataMateria = data
      bandera = null
    })
      .catch(dataMateria = 'error')
  }
  console.log(dataMateria)
  console.log(caches)


  return (
    <div>
      {dataMateria === 'error' ? <h1>API 404 o Actualmente no cuenta con materias asisgnada...</h1> : <TabsWrappedLabel />
        //cache.nm >= 0 ? <TabsWrappedLabel />:<h1>sin conencion al api</h1>
      }
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
