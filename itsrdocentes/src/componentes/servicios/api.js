const urlApi = 'http://localhost:3001';

async function request(url, metodo, data) {
 const response = await fetch(`${urlApi}${url}`,{
        metodo,
        headers:{
            'Accept':'application/json',
            'Content-Type':'aplication/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        });/*  */
        const jsonReponse = await response.json();
        
        return jsonReponse;
        
}

export function create(data) {
    return request('/insert','POST',data);
}
 
export function materiasD() {
    return request('/materias','Get');
}
export function update(id,data) {
    return request(`/materias/${id}`,'POST',data);
}
export function borrer(id) {
    return request(`/materias/${id}`,'DELETE');
}
