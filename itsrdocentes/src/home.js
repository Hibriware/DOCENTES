import React, { Component, Suspense } from 'react';
import Usuarios from './componentes/menu_usuarios/usuarios';
import PageError from './componentes/404';
import { materiasD, getPeriodo } from './componentes/servicios/api';
import Loader from './login/cargaDedatos';
import AuthService from './componentes/servicios/AuthService';
export var dataMateria = null,
	ID_USUARIO = 0;
export var caches, bandera, perio;

export const resetear = () => {
  try {
    console.log('ELIMINAR TODOS LOD DATOS TEMPORALES');
    caches = null;
    dataMateria = null;
  } catch (error) {
    console.log("ERROR EN LA FUNCION RESETEAR()")
  }

};

function CargadeDatos(data) {
	let roles = data.data[0].nombreRol;
	ID_USUARIO = data.data[0].usuarioID;
	//validar la ruta
	if (roles === 'Administrador' || roles === 'Gestión Escolar') {
		//inicio
		console.log('Administrador');
		if (!caches) {
			throw getPeriodo()
				.then((res) => {
					if (res === 'error') {
						perio = true;
						caches = res;
					} else if (res === 'not') {
						perio = false;
						caches = true;
					} else {
						caches = res;
						perio = false;
					}
				})
				.catch((perio = true));
		}
		//fint

		return (
			<React.Fragment>
				{perio ? (
					<PageError
						onAuthChange={data.onAuthChange}
						onGenerar={data.logout}
						resetear={resetear}
						informacion="Informacion no disponible "
					/>
				) : (
					<Usuarios onAuthChange={data.onAuthChange} resetear={resetear} />
				)}
			</React.Fragment>
		);
	} else if (roles === 'Docente') {
		//inicio
		console.log('Docente Docente Docente');
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

	/*return (
    <div>
      {dataMateria === 'error' ? <h1>API 404 o Actualmente no cuenta con materias asisgnada...</h1> : <Usuarios />}
    </div>
  );*/

}

export const dataMaterias = async () => {
	dataMateria = await materiasD();
};

//export var fecha1 = '2020-02-27', fecha2 = '2020-03-27', fecha3 = '2020-04-27';

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
