export const urlApi:any = process.env.REACT_APP_SERVER_HOST
export const list_date =`/api/administrador/fechas`;
export const All_List_Date =`/api/aspirante/consultar/estado/temas`;
export const GET_KARDEX='/api/reporte/consultar/cardex-admin';


export function getToken() {
    const TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
    return TOKEN_USUARIO;
}
