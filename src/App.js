import React, {Component} from 'react';
import axios from 'axios';
import Home from './home';
import Login from './Login/login';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import AuthService from './componentes/servicios/AuthService';
import StudentProvider from './componentes/Administradores/Reinscripciones/providers/StudentProvider';
import {PeridoActivoProvider} from './Context/PeriodoActivo/ContexPeriodoActivo';
import {PeridoMateriasProvider} from "./Context/PeriodoMateria/ContextPeriodosMateria";
import {MateriasProvider} from './Context/ListaMateriaDocente/ContextMaterias';
import {urlApi} from '../src/componentes/servicios/api';

axios.defaults.baseURL = urlApi;

class App extends Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService();
        this.state = {auth: this.auth.isLoggedIn()};
        this.onAuthChange = this.onAuthChange.bind(this);
    }

    render() {

        if (this.state.auth) {
            return (<StudentProvider>
                <PeridoMateriasProvider>
                    <MateriasProvider>
                        <PeridoActivoProvider>
                            <Home onAuthChange={this.onAuthChange}></Home>
                        </PeridoActivoProvider>
                    </MateriasProvider>
                </PeridoMateriasProvider>
            </StudentProvider>)
        }
        return (

            <Switch>
                <Route exact path="/"
                       render={(routerProps) => <Login {...routerProps} onAuthChange={this.onAuthChange}></Login>}/>
                <Redirect from="*" to="/"/>
            </Switch>

        );

    }

    onAuthChange() {
        this.setState({auth: this.auth.isLoggedIn()})
    }
}


export default App;
