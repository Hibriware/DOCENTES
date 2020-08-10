import React,{Component} from 'react';
import {Redirect,Route} from 'react-router-dom';

//const [{nombreRol}] = sessionStorage.getItem("resul")



function isLoggedInDocente (textRol) {
        if(!!getToken()){
            const [{nombreRol}] = JSON.parse(sessionStorage.getItem("resul"))
            console.log(nombreRol)
            return nombreRol === textRol ? true: false
        }else{
            return false;
        }
}

function isLoggedInAdministradores () {
    if(!!getToken()){
        const [{nombreRol}] = JSON.parse(sessionStorage.getItem("resul"))
        console.log(nombreRol)
        return nombreRol === 'Administrador' || nombreRol === 'Gestión Escolar' ? true: false
    }else{
        return false;
    }
}

function getToken () {
        return sessionStorage.getItem('token_id');
}

export const PrivateRoute_Doncente = ({component:Component,...rest}) =>{
        return(<Route {...rest} render={props => 
            (isLoggedInDocente('Docente')) ? <Component {...props}/>:<Redirect to={{pathname:"/",state:{from:props.location}}} {...props}/>
        } />)
}

    
export const PrivateRoute_Administador = ({component:Component,...rest}) =>{
        return(<Route {...rest} render={props => 
            (isLoggedInAdministradores()) ? <Component {...props}/>:<Redirect to={{pathname:"/",state:{from:props.location}}} {...props}/>
        } />)
}
