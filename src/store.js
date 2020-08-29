import {createStore} from 'redux';
import {materiasD} from './componentes/servicios/api';


const inicialState = {
    docentes:[],
    materias:[] ,
    porcentaje:[{
        t1:'80',t2:'10',t3:'10'
    }],
    alumnosState:[{
        id:'1', control:'14E20301', nombre:'SAMUEL RIVAS GARCIA',curso:'ESCOLARIZADO', opcion:'O',c1:'100', c2:'90',c3:'90', accion:'l' ,v:'4',vv:'2',vvv:'1'},
        {id:'2', control:'14E20302', nombre:'DANY CAMBRANO ARCOZ',curso:'ESCOLARIZADO', opcion:'O',c1:'9', c2:'8',c3:'7.3'},
        {id:'3', control:'14E20303', nombre:'LUIS ALVERTO DE LA CRUZ DIAZ',curso:'ESCOLARIZADO', opcion:'O',c1:'9', c2:'8',c3:'9.7'},
       { id:'4', control:'14E20304', nombre:'JOSE BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'9.4', c2:'8.3',c3:'9.7'},
       
       { id:'5', control:'14E20304', nombre:'PEDRO BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'9.1', c2:'8',c3:'7'},
       
       { id:'6', control:'14E20304', nombre:'JUAN BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'2', c2:'3.4',c3:'9'},
       
       { id:'7', control:'14E20304', nombre:'MANUEL BIRRUTTA CASTROS',curso:'ESCOLARIZADOd', opcion:'O',c1:'4', c2:'8',c3:'9.1'}],

}


const reducerDocentes = (state = inicialState , action) =>{


    if(action.type === 'updateCalificacion'){
        return{
            ...state,
            materias: state.materias.concat(action.calificacionNew)
        }
    }else if(action.type === 'updateMarerias'){
        return{
        
        materias: state.materias.concat(action.materiasDoncente)
        }
    }

console.log(action)

return state
}

export default createStore(reducerDocentes)
