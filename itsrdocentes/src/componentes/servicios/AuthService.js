import decode from 'jwt-decode';

export default class AuthService {

    constructor(domain){
        console.log("met constructor")

        this.domain = domain || "http://localhost:4000"
        this.requestFetch = this.requestFetch.bind(this);
        this.login = this.login.bind(this);
       this.logout = this.logout.bind(this)
        this.getProfile = this.getProfile.bind(this);
    }
    login(usuario, password){
        console.log(usuario ,password )

        return this.requestFetch('/api/login/login',{
            method:'POST',
            body:JSON.stringify({usuario,password})
        }).then(response => {
            console.log(response)
            this.setToken(response.token);
            this.setUser(response.resul);
            return Promise.resolve(response);
        })
    }

    isLoggedIn(){
        console.log("met isLoggedIn")
        return !! this.getToken();
    }
    
    setToken(token){
        localStorage.setItem('token_id', token);
    }
    
    getToken(){
        return localStorage.getItem('token_id');
    }

    setUser(userJSON){
        localStorage.setItem('resul',JSON.stringify(userJSON));
    }
    
    getUser(){
        return JSON.parse(localStorage.getItem('resul'));
    }

    getUserAccess(){
        let user = this.getUser();
        if(user){
            return user[0].nombreRol;
        }else{
            return false;
        }
    }

    getProfile(){
        return decode(this.getToken());
    }

    logout(){
        localStorage.removeItem('token_id');
        localStorage.removeItem('resul');
    }


requestFetch(urlRelative, opcions) {//inicio
console.log("peticion de token")
   
const headers ={
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
    if(this.isLoggedIn()){
        headers['token'] = this.getToken();
    }
    return fetch(this.domain + urlRelative,{
        headers,
        ...opcions
    }).then(response => response.json()).catch(
        error => Promise.reject(error)
    )
}//fin


}


