const axios = require('axios')
const urlApi = 'http://localhost:4000';



async function request(url, metodo, data) {
    console.log(data)
    console.log(metodo)

    console.log(url)

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

export function treeApi(datas) {
    console.log(datas)
axios({
    method:'POST',
    url:`${urlApi}/api/personal/add`,
    data:datas
}).then(res =>console.log(res))

   // return request('/api/personal/add','POST',data);
}
 
export function materiasD() {
    return request(`/api/personal/consultar/${251}`,'Get');
}
export function update(id,data) {
    return request(`/materias/${id}`,'POST',data);
}
export function borrer(id) {
    return request(`/materias/${id}`,'DELETE');
}
