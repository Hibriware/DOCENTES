import { urlApi } from "../../../servicios/api";
import swal from "sweetalert";

const axios = require("axios");

//data administrador
export async function crearRegistroConcepto(datas) {
	let cadenaCeros = '00';
	let resultados = cadenaCeros + datas.clave;
	resultados = resultados.substring(resultados.length - cadenaCeros.length);

    await axios
      .post(
        `/api/pagos/registrar/concepto`,
        {
          nombreconcepto: datas.concepto,
          costo: parseFloat(datas.costo),
          constante: "A",
          claveconcepto: resultados,
        }
      )
      .then((res) => swal("", `SERVICIO REGISTRADO`, "success"))
      .catch(function (error) {
        console.log(error);
        swal("error!", "Verifique su conexion a internet!", "warning");
      });
 
  //crear calificacion alumno
}


export async function getListaConcepto() {
	try {
		const response = await axios
			.get(`/api/pagos/consultar/conceptos`)
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


export async function putConcepto(id, costo) {
		let TOKEN_USUARIO = { headers: { token: `${sessionStorage.getItem('token_id')}` } };
		await axios
			.put(
				`${urlApi}/api/pagos/actualizar/concepto/${id}`,
				{
					costo:parseFloat(costo)
				},
				TOKEN_USUARIO
			)
			.then(function() {
				console.log("ok");
			})
			.catch(function(error) {
				console.log(error);
			});

}
