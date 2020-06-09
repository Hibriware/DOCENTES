import React,{Component} from 'react';
import Home from './home';
import Login from './login/login';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import AuthService from './componentes/servicios/AuthService';

//export let  ID_USUARIO = 251 ;
//export let PERIODO_ACTUAL=7;

class App extends Component{
  constructor(props){
    super(props);
    this.auth = new AuthService();
    this.state = {auth:this.auth.isLoggedIn()};
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  render(){

    if(this.state.auth){
      return(<Home onAuthChange={this.onAuthChange}></Home>)
    }
    return (   
    
      <Switch>
        <Route exact path="/" render={(routerProps) =><Login {...routerProps} onAuthChange={this.onAuthChange}></Login>}/>
        <Redirect from="*" to="/"/>
      </Switch>
    
    );
   
  }
  onAuthChange(){
    this.setState({auth:this.auth.isLoggedIn()})
  }
}



export default App;
