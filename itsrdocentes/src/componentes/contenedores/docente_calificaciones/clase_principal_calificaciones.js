import React, { Component } from 'react';
import Docente_cafificacines from './docente_calificaiones';
import { areglo2 } from './docente_calificaiones';
import TablaPrueva from './tablaprueva';


export var tema1X = 0, tema2X = 0,tema3X =0;

export function porcentajeActual() {
    console.log("asingnando porentajes ....")
        let porcentajesActual = [{
            id: '1',
            nombre: 'ing samu',
            tema1: 20,
            tema2: '40',
            tema3: '50'
        }];
    tema1X= porcentajesActual[0].tema1;
    tema2X=porcentajesActual[0].tema2;
    tema3X=porcentajesActual[0].tema3;
    console.log(tema1X + "clase..")
    }

export var dataAlumnos=[{
    id:'1', control:'14E20301', nombre:'SAMUEL RIVAS GARCIA',curso:'ESCOLARIZADO', opcion:'O',c1:'100', c2:'90',c3:'90', accion:'l' ,v:'4',vv:'2',vvv:'1'},
    {id:'2', control:'14E20302', nombre:'DANY CAMBRANO ARCOZ',curso:'ESCOLARIZADO', opcion:'O',c1:'9', c2:'8',c3:'7.3'},
    {id:'3', control:'14E20303', nombre:'LUIS ALVERTO DE LA CRUZ DIAZ',curso:'ESCOLARIZADO', opcion:'O',c1:'9', c2:'8',c3:'9.7'},
   { id:'4', control:'14E20304', nombre:'JOSE BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'9.4', c2:'8.3',c3:'9.7'},
   
   { id:'5', control:'14E20304', nombre:'PEDRO BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'9.1', c2:'8',c3:'7'},
   
   { id:'6', control:'14E20304', nombre:'JUAN BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'2', c2:'3.4',c3:'9'},
   
   { id:'7', control:'14E20304', nombre:'MANUEL BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'4', c2:'8',c3:'9.1'}


];
export var data=[{
    id:'1', control:'14E20301', nombre:'SAMUEL RIVAS GARCIA',curso:'ESCOLARIZADO', opcion:'O',c1:'100', c2:'90',c3:'90', accion:'l' ,v:'4',vv:'2',vvv:'1'},
    {id:'2', control:'14E20302', nombre:'DANY CAMBRANO ARCOZ',curso:'ESCOLARIZADO', opcion:'O',c1:'9', c2:'8',c3:'7.3'},
    {id:'3', control:'14E20303', nombre:'LUIS ALVERTO DE LA CRUZ DIAZ',curso:'ESCOLARIZADO', opcion:'O',c1:'9', c2:'8',c3:'9.7'},
   { id:'4', control:'14E20304', nombre:'JOSE BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'9.4', c2:'8.3',c3:'9.7'},
   
   { id:'5', control:'14E20304', nombre:'PEDRO BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'9.1', c2:'8',c3:'7'},
   
   { id:'6', control:'14E20304', nombre:'JUAN BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'2', c2:'3.4',c3:'9'},
   
   { id:'7', control:'14E20304', nombre:'MANUEL BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'4', c2:'8',c3:'9.1'}


];

class Calificaciones_principal extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }


  
    



    componentDidMount() {
        console.log(areglo2)
    }


    render() {
        return (
            <div>
                
                <TablaPrueva/>
            </div>
        )
    }
}

export default Calificaciones_principal;