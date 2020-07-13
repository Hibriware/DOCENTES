import { urlApi } from "../../servicios/api";
import swal from "sweetalert";

const axios = require("axios");

//data administrador
export async function crearRegistroConcepto(datas) {
    let TOKEN_USUARIO = {
      headers: { token: `${sessionStorage.getItem("token_id")}` },
    };
console.log(datas)
    await axios
      .post(
        `${urlApi}/api/pagos/registrar/concepto`,
        {
          nombreconcepto: datas.concepto,
          costo: parseFloat(datas.costo),
          constante: "A",
          clave: datas.clave,
        },
        TOKEN_USUARIO
      )
      .then((res) => swal("", `FECHAS REGISTRADAS`, "success"))
      .catch(function (error) {
        console.log(error);
        swal("error!", "Verifique su conexion a internet!", "warning");
      });
 
  //crear calificacion alumno
}


export async function getListaConcepto() {
	try {
		let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		const response = await axios
			.get(`${urlApi}/api/pagos/consultar/conceptos`, TOKEN_USUARIO)
			.then((res) => res.data)
			.catch(function(error) {
				swal('!', `${error}`, 'warning');
				return false;
			});
		return response;
	} catch (error) {
		console.log(error);
	}
}