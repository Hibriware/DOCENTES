import decode from 'jwt-decode';
import * as toastr from 'toastr';

export default class AuthService {
	constructor(domain) {
		console.log('met constructor');

		this.domain = domain || 'http://212.237.52.166:4000'; //https://app-api-docentes.herokuapp.com

		this.requestFetch = this.requestFetch.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.getProfile = this.getProfile.bind(this);
	}
	login(usuario, password) {
		try {
			console.log(usuario, password + 'gsssss---');

			return this.requestFetch('/api/login/verificar', {
				method: 'POST',
				body: JSON.stringify({ usuario, password })
			}).then((response) => {
				console.log(response);
				if (response.message === 'ocurrio un error' || response.message === 'contraseña incorrecta') {
					console.log('usuarios incorrectos');
				} else {
					this.setToken(response.token);
					this.setUser(response.user);
					return Promise.resolve(response);
				}
				toastr.warning('contraseña o usuario', 'Incorrectos');
			});
		} catch (error) {
			console.log(error);
		}
	}

	isLoggedIn() {
		try {
			console.log('met isLoggedIn');
			return !!this.getToken();
		} catch (error) {
			console.log(error);
		}
	}

	setToken(token) {
		try {
			localStorage.setItem('token_id', token);
		} catch (error) {
			console.log(error);
		}
	}

	getToken() {
		try {
			return localStorage.getItem('token_id');
		} catch (error) {
			console.log(error);
		}
	}

	setUser(userJSON) {
		try {
			localStorage.setItem('resul', JSON.stringify(userJSON));
		} catch (error) {
			console.log(error);
		}
	}

	getUser() {
		try {
			return JSON.parse(localStorage.getItem('resul'));
		} catch (error) {
			console.log(error);
		}
	}

	getUserAccess() {
		try {
			let user = this.getUser();
			console.log(user);
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
			localStorage.removeItem('token_id');
			localStorage.removeItem('resul');
		} catch (error) {
			console.log(error);
		}
	}

	requestFetch(urlRelative, opcions) {
		//inicio
		try {
			console.log('peticion de token');

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
