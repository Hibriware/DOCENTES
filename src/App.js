import React,{Component} from 'react';
import Home from './home';
import Login from './login/login';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import AuthService from './componentes/servicios/AuthService';
import StudentProvider from './componentes/Reinscripciones/providers/StudentProvider';
import {PeridoMateriasProvider} from "./componentes/Context/PeriodoMateria/ContextPeriodosMateria";
import {MateriasProvider} from './componentes/Context/ListaMateriaDocente/ContextMaterias';
import axios from 'axios';
import {urlApi} from '../src/componentes/servicios/api';
let TOKEN_USUARIO = `${sessionStorage.getItem('token_id')}`;
axios.defaults.baseURL=urlApi;
axios.defaults.headers.common['token']=TOKEN_USUARIO

class App extends Component{
  constructor(props){
    super(props);
    this.auth = new AuthService();
    this.state = {auth:this.auth.isLoggedIn()};
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  render(){

    if(this.state.auth){
      return(<StudentProvider>
        <PeridoMateriasProvider>
          <MateriasProvider>
        <Home onAuthChange={this.onAuthChange}></Home>
          </MateriasProvider>
        </PeridoMateriasProvider>
      </StudentProvider>)
    }
    return (   
    
      <Switch>
        <Route exact  path="/" render={(routerProps) =><Login {...routerProps} onAuthChange={this.onAuthChange}></Login>}/>
        <Redirect from="*" to="/"/>
      </Switch>
    
    );
   
  }
  onAuthChange(){
    this.setState({auth:this.auth.isLoggedIn()})
  }
}



export default App;
