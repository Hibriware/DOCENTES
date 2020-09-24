export const urlApi:any = process.env.REACT_APP_SERVER_HOST
export const list_date =`${urlApi}/api/administrador/fechas`;
export const All_List_Date =`${urlApi}/api/aspirante/consultar/estado/temas`;

export function getToken() {
    const TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
    return TOKEN_USUARIO;
}