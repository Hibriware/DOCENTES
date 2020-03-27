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
    throw materiasD().then(task => (cache = task));
  }
  return (
    <div>
     <TabsWrappedLabel />
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
      

  // async componentDidMount() {
    //   await this.dataMateria()
        // Actualiza el título del documento usando la API del navegador
      //  console.log("estoy actualiando mareias...")
    //};



    async dataMateria() {
        dataMateria = await materiasD();

        console.log(dataMateria)
    }
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
