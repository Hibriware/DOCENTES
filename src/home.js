import React, {Component, Suspense, useContext, useEffect} from 'react';
import Usuarios from './componentes/menu_usuarios/usuarios';
import PageError from './componentes/404';
import {materiasD} from './componentes/servicios/api';
import Loader from './login/loading';
import AuthService from './componentes/servicios/AuthService';
import {PeriodoMateriasContext} from "./componentes/Context/PeriodoMateria/ContextPeriodosMateria";
import {MateriasContext} from './componentes/Context/ListaMateriaDocente/ContextMaterias';
import axios from 'axios';
export var dataMateria = null,
	ID_USUARIO = 0;
export var caches;

export const resetear = () => {
  try {
    //'ELIMINAR TODOS LOs DATOS TEMPORALES'
    caches = null;
    dataMateria = null;
  } catch (error) {
    console.log(error)
  }

};

function CargadeDatos(data) {
	const [statePeriodoMateria,setStatePeriodoMateria,periodoLoader] = useContext(PeriodoMateriasContext);
	const {stateMateria,setStateMateria} =useContext(MateriasContext);
	const [loader,setLoader]=React.useState(true);

	useEffect(()=>{
		//setLoader(statePeriodoMateria?.data[0]?.periodo ? true:false);
		if(statePeriodoMateria?.data[0]?.periodo){
			axios.get(`/api/aspirante/consultar/lista-materia-docentes`,{
				params:{
					personalId:ID_USUARIO,
					periodo:statePeriodoMateria?.data[0]?.periodo
				}

			}).then((res)=>{
				setLoader(false)
				setStateMateria(res.data?.datas)
			}).catch((error)=> {
				console.log(error)
				setLoader(false)
			})
		}
	},[statePeriodoMateria?.data[0]?.periodo]);

	let roles = data.data[0].nombreRol;
	ID_USUARIO = data.data[0].usuarioID;
	if (roles === 'Administrador' || roles === 'Gestión Escolar') {
		return (<Usuarios onAuthChange={data.onAuthChange} resetear={resetear} />);
	}else if(roles === 'Jefe académico'){
			return (<Usuarios onAuthChange={data.onAuthChange} resetear={resetear} />);
	} else if (roles === 'Docente') {//inicio docente

		return (
			<React.Fragment>
				{
				statePeriodoMateria?.data.length && stateMateria.length ?
					(<Usuarios onAuthChange={data.onAuthChange} resetear={resetear} />):
					loader && periodoLoader?
					<Loader />:
					<PageError
						onAuthChange={data.onAuthChange}
						onGenerar={data.logout}
						resetear={resetear}
						informacion="No cuenta con materias asignadas en el actual periodo "
					/>
				}
			</React.Fragment>
		);

		/*if (!caches) {
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
		);*/
	} else{//fin docente
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

export const dataMaterias = async (periodo) => {
	dataMateria = await materiasD(periodo);
};


class Home extends Component {
	constructor(props) {
		super();
		this.AuthService = new AuthService();
		this.logout = this.logout.bind(this);

		this.state = {};
	}

	componentDidMount() {
	this.AuthService.setTokenUser();
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
