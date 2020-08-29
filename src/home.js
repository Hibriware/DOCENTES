import React, { Component, Suspense } from 'react';
import Usuarios from './componentes/menu_usuarios/usuarios';
import PageError from './componentes/404';
import { materiasD, getPeriodo } from './componentes/servicios/api';
import Loader from './login/loading';
import AuthService from './componentes/servicios/AuthService';
export var dataMateria = null,
	ID_USUARIO = 0;
export var caches, bandera, perio;

export const resetear = () => {
  try {
    //'ELIMINAR TODOS LOD DATOS TEMPORALES'
    caches = null;
    dataMateria = null;
  } catch (error) {
    console.log(error)
  }

};

function CargadeDatos(data) {
	let roles = data.data[0].nombreRol;
	ID_USUARIO = data.data[0].usuarioID;
	if (roles === 'Administrador' || roles === 'Gestión Escolar') {
		return (<Usuarios onAuthChange={data.onAuthChange} resetear={resetear} />);
	}else if(roles === 'Jefe académico'){
			return (<Usuarios onAuthChange={data.onAuthChange} resetear={resetear} />);
	} else if (roles === 'Docente') {
		if (!caches) {
			throw getPeriodo()
				.then((res) => {
					if (res === 'error') {
						perio = true;
						caches = res;
					} else if (res === 'not') {
						dataMateria = 'error';
						caches = res;
					} else {
						caches = res;
						bandera = caches;
					}
				})
				.catch((dataMateria = 'error'));
		}

		if (bandera) {
			throw materiasD()
				.then((data) => {
					dataMateria = data;
					bandera = null;
				})
				.catch((dataMateria = 'error'));
		}

		return (
			<React.Fragment>
				{perio ? (
					<PageError
						onAuthChange={data.onAuthChange}
						onGenerar={data.logout}
						resetear={resetear}
						informacion="Informacion no disponible "
					/>
				) : dataMateria === 'error' ? (
					<PageError
						onAuthChange={data.onAuthChange}
						onGenerar={data.logout}
						resetear={resetear}
						informacion="No cuenta con materias asignadas en el actual periodo "
					/>
				) : (
					<Usuarios onAuthChange={data.onAuthChange} resetear={resetear} />
				)}
			</React.Fragment>
		);
	} else{
		return (
					<PageError
						onAuthChange={data.onAuthChange}
						onGenerar={data.logout}
						resetear={resetear}
						informacion="No está asignado a ningun modulo"
						/>
		  );
	}

}

export const dataMaterias = async () => {
	dataMateria = await materiasD();
};


class Home extends Component {
	constructor(props) {
		super();
		this.AuthService = new AuthService();
		this.logout = this.logout.bind(this);

		this.state = {};
	}

	render() {
		const n = this.AuthService.getUser();
		return (
			<React.Fragment>
				<Suspense fallback={<Loader />}>
					<CargadeDatos data={n} onAuthChange={this.props.onAuthChange} logout={this.logout} />
				</Suspense>
			</React.Fragment>
		);
	}
	logout() {
		this.AuthService.logout();
		this.props.onAuthChange();
	}
}

export default Home;
