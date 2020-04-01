import React, { Component,Suspense  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabsWrappedLabel from './componentes/menu_opciones';
import { materiasD } from './componentes/servicios/api';
import LinearProgress from '@material-ui/core/LinearProgress';

export let dataMateria = null ;
   

let cache = null;



const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  

function CargadeDatos() {
  if (!dataMateria) {
    console.log(cache + " ..1")
    throw materiasD().then(datas => (dataMateria = datas )
    ).catch(dataMateria = 'error');
  }

  console.log(dataMateria)
  return (
    <div>
     { (dataMateria === 'error' )?<h1>API 404</h1>: (dataMateria.sin === 'null') ? <h1>Actualmente no cuenta con materias asisgnada...</h1>:<TabsWrappedLabel />
     //cache.nm >= 0 ? <TabsWrappedLabel />:<h1>sin conencion al api</h1>
     }
    </div>    
  );
}
   
  
 export const dataMaterias  = async () =>{
  dataMateria = await materiasD();
  console.log(dataMateria)
}
export var fecha1 = '2020-02-27', fecha2 = '2020-03-27', fecha3 = '2020-04-27';

class Home extends Component {


    constructor(props){
        super();
        this.state= {

        }
    
    }

  
   /* async shouldComponentUpdate() {
        try {
            console.log("estoy actualiando mareias...")
        await this.dataMaterias()
        console.log("listo...")
        return false; 
        } catch (error) {
            console.log(error)
        }
       
      }}*/
    

  // async componentDidMount() {
    //   await this.dataMateria()
        // Actualiza el título del documento usando la API del navegador
      //  console.log("estoy actualiando mareias...")
    //};


    render() {
       
        

        return (
            
            <Suspense  fallback={
  <LinearProgress /> }>
            <CargadeDatos />
            
          </Suspense>
   
 
           
            
        )
    }
};


export default Home
