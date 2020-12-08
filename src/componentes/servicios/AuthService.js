import decode from 'jwt-decode';
import * as toastr from 'toastr';
import axios from "axios";


export default class AuthService {
	constructor(domain) {
		this.domain = domain || process.env.REACT_APP_SERVER_HOST; //https://app-api-docentes.herokuapp.com

		this.requestFetch = this.requestFetch.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.setTokenUser=this.setTokenUser.bind(this)
	}



	setTokenUser(){
		const MeToken = this.getToken();
		axios.defaults.headers.common['token']= MeToken;
	}

	login(usuario, password) {
		try {
			return this.requestFetch('/api/login/verificar', {
				method: 'POST',
				body: JSON.stringify({ usuario, password })
			}).then((response) => {
				if (response.message === 'ocurrio un error' || response.message === 'contraseña incorrecta' || response.message === 'usuario incorrecto') {
					toastr.warning(response.message, 'Incorrectos');
				} else if(response.user.length) {
					this.setToken(response.token);
					this.setUser(response.user);
					this.setTokenUser()

					return Promise.resolve(response);
				}else{
					return Promise.resolve("No Autorizado");
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	isLoggedIn() {
		try {
			return !!this.getToken();
		} catch (error) {
			console.log(error);
		}
	}

	setToken(token) {
		try {
			sessionStorage.setItem('token_id', token);
		} catch (error) {
			console.log(error);
		}
	}

	getToken() {
		try {
			return sessionStorage.getItem('token_id');
		} catch (error) {
			console.log(error);
		}
	}

	setUser(userJSON) {
		try {
			sessionStorage.setItem('resul', JSON.stringify(userJSON));
		} catch (error) {
			console.log(error);
		}
	}

	getUser() {
		try {
			return JSON.parse(sessionStorage.getItem('resul'));
		} catch (error) {
			console.log(error);
		}
	}

	getUserAccess() {
		try {
			let user = this.getUser();
			if (user) {
				return user[0].nombreRol;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	}

	getProfile() {
		try {
			return decode(this.getToken());
		} catch (error) {
			console.log(error);
		}
	}

	logout() {
		try {
			sessionStorage.removeItem('token_id');
			sessionStorage.removeItem('resul');
		} catch (error) {
			console.log(error);
		}
	}

	requestFetch(urlRelative, opcions) {
		//inicio
		try {
			const headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			};
			if (this.isLoggedIn()) {
				headers['token'] = this.getToken();
			}
			return fetch(this.domain + urlRelative, {
				headers,
				...opcions
			})
				.then((response) => response.json())
				.catch((error) => Promise.reject(error));
		} catch (error) {
			console.log(error);
		}
	} //fin
}
