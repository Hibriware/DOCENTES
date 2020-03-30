import React, { Component,Suspense  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabsWrappedLabel from './componentes/menu_opciones';
import { materiasD } from './componentes/servicios/api';
import LinearProgress from '@material-ui/core/LinearProgress';

export let dataMateria ;


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
  if (!cache) {
    console.log(cache + " ..1")
    throw materiasD().then(task => (cache = task)
    ).catch(cache = 'error');
  }

  console.log(cache + " ..2")
  return (
    <div>
     { (cache === 'error' )?<h1>API 404</h1>: (cache.sin === 'null') ? <h1>Actualmente no cuenta con materias asisgnada...</h1>:<TabsWrappedLabel />
     //cache.nm >= 0 ? <TabsWrappedLabel />:<h1>sin conencion al api</h1>
     }
    </div>    
  );
}
   

class Home extends Component {


    constructor(props){
        super();
        this.state= {

        }
        this.shouldComponentUpdate = this.shouldComponentUpdate();
    
    }

  
    async shouldComponentUpdate() {
        try {
            console.log("estoy actualiando mareias...")
        await this.dataMateria()
        console.log("listo...")
        return false; 
        } catch (error) {
            console.log(error)
        }
       
      }
      
    async dataMateria() {
      dataMateria = await materiasD();

      console.log(dataMateria)
  }

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
