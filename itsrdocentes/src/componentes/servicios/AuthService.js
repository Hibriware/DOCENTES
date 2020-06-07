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
		console.log(usuario, password + 'gsssss---');

		return this.requestFetch('/api/login/verificar', {
			method: 'POST',
			body: JSON.stringify({ usuario, password })
		}).then((response) => {
			console.log(response);
			if (response.sin === 'null') {
				console.log('usuarios incorrectos');
			} else {
				this.setToken(response.token);
				this.setUser(response.user);
				return Promise.resolve(response);
			}
			toastr.warning('contraseña o usuario', 'Incorrectos');
		});
	}

	isLoggedIn() {
		console.log('met isLoggedIn');
		return !!this.getToken();
	}

	setToken(token) {
		localStorage.setItem('token_id', token);
	}

	getToken() {
		return localStorage.getItem('token_id');
	}

	setUser(userJSON) {
		localStorage.setItem('resul', JSON.stringify(userJSON));
	}

	getUser() {
		return JSON.parse(localStorage.getItem('resul'));
	}

	getUserAccess() {
		let user = this.getUser();
		console.log(user);
		if (user) {
			return user[0].nombreRol;
		} else {
			return false;
		}
	}

	getProfile() {
		return decode(this.getToken());
	}

	logout() {
		localStorage.removeItem('token_id');
		localStorage.removeItem('resul');
	}

	requestFetch(urlRelative, opcions) {
		//inicio
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
	} //fin
}
