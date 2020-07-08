import {getListaCarreras,getCalificaciones,getCatalogoCarrera, getListaControlesCarrera} from '../servicios/api';
import {boletacarrera} from './pdfCarreras';
import swal from 'sweetalert';


//BUSCAR ID_CARRERA, PERIODO, SEMESTRE
 export async function main(PERIODO, ID_CARRERA,SEMESTRE) {
     try {
    //variables
    let TODOS_LOS_PDF = []
    let TODOS_LOS_PDF_INFORMACION = []
    //variables
    console.time("LISTA_SEMESTRES_POR_CARRERA_PRIMERA_CONSULTA")
   let LISTA_SEMESTRES_POR_CARRERA = await getListaControlesCarrera(PERIODO, SEMESTRE,ID_CARRERA.value)//LISTA DE SEMESTRES POR CARRERA
   console.timeEnd("LISTA_SEMESTRES_POR_CARRERA_PRIMERA_CONSULTA")
  console.log(LISTA_SEMESTRES_POR_CARRERA)

   if(LISTA_SEMESTRES_POR_CARRERA.length > 0){

   for (let index_lista = 0; index_lista < LISTA_SEMESTRES_POR_CARRERA.length; index_lista++) {

    let PDF = [
        {
        calificacion: '',
        clave: '',
        creditos: '',
        docente: '',
        materia: '',
        opcion: ''
    },  {
        calificacion: '',
        clave: '',
        creditos: '',
        docente: '',
        materia: '',
        opcion: ''
    },
    {
        calificacion: '',
        clave: '',
        creditos: '',
        docente: '',
        materia: '',
        opcion: ''
    },  {
        calificacion: '',
        clave: '',
        creditos: '',
        docente: '',
        materia: '',
        opcion: ''
    },   {
        calificacion: '',
        clave: '',
        creditos: '',
        docente: '',
        materia: '',
        opcion: ''
    },  {
        calificacion: '',
        clave: '',
        creditos: '',
        docente: '',
        materia: '',
        opcion: ''
    },
    {
        calificacion: '',
        clave: '',
        creditos: '',
        docente: '',
        materia: '',
        opcion: ''
    },  {
        calificacion: '',
        clave: '',
        creditos: '',
        docente: '',
        materia: '',
        opcion: ''
    }
    ];
    let INFORMACIONASPIRANTE = [{
        nomeroControl:'',
        numeroPeriodo:'',
        rangoPeriodo:'',
        nombreCarrera:'',
        nombreAspirante:'',
        promedio:'',
        materiasReprobadas:'',
        totalCreditos:'',
        creditosAprobados:''

    }]

    var DATOSCARRERA_ASPIRENTES = [];
    var DATOS_CALIFICACIONES = [];
    var DATOS_CARRERAS = [];
    var DATOS_BOLETA_FINAL =[];

    let CARRERA_NUMERO_CONTROL = LISTA_SEMESTRES_POR_CARRERA[index_lista].numeroControl;
    console.time("DATOSCARRERA_ASPIRENTES_2")
    DATOSCARRERA_ASPIRENTES = await getListaCarreras(PERIODO,CARRERA_NUMERO_CONTROL,SEMESTRE)
    console.timeEnd("DATOSCARRERA_ASPIRENTES_2")

    if(DATOSCARRERA_ASPIRENTES.length > 0){
        let BOLETA_ID_CARRERA =  DATOSCARRERA_ASPIRENTES[0].idCarrera;//quitar
        let BOLETA_SEMESTRE = SEMESTRE
        let BOLETA_FOLIO = DATOSCARRERA_ASPIRENTES[0].Folio;
        let BOLETA_PERIODO = DATOSCARRERA_ASPIRENTES[0].idcat_RanPer;

        var ASPIRANTE_CONTROL = DATOSCARRERA_ASPIRENTES[0].numeroControl;
        var ASPIRANTE_NOMBRE = DATOSCARRERA_ASPIRENTES[0].nombreAspirante;
        var ASPIRANTE_PATERNO = DATOSCARRERA_ASPIRENTES[0].apellidoPaterno;
        var ASPIRANTE_MATERNO = DATOSCARRERA_ASPIRENTES[0].apellidoMaterno;


        var ASPIRANTE_CARRERA =  DATOSCARRERA_ASPIRENTES[0].nombreCarrera;
        var ASPIRANTE_RANGO_PERIODO =  DATOSCARRERA_ASPIRENTES[0].rangoPeriodo;
        var ASPIRANTE_NUMERO_PERIODO = DATOSCARRERA_ASPIRENTES[0].semestre;

// ASPIRANTE_CONTROL,ASPIRANTE_NOMBRE,ASPIRANTE_PATERNO,ASPIRANTE_MATERNO,ASPIRANTE_CARRERA,ASPIRANTE_RANGO_PERIODO,ASPIRANTE_NUMERO_PERIODO

      //catalogo/carrera/1/137/7/19 SEMESTRE - FOLIO - PERIODO - IDCARRERA (semestre, folio,periodo,idcarrera)
      console.time("DATOS_CARRERAS_3")
            DATOS_CARRERAS=  await getCatalogoCarrera(BOLETA_SEMESTRE,BOLETA_FOLIO,BOLETA_PERIODO,BOLETA_ID_CARRERA)
      console.timeEnd("DATOS_CARRERAS_3")

            //console.log(DATOS_CARRERAS)

            for (let index = 0; index < DATOS_CARRERAS.length; index++) {
                 let CARRERA_PERIODO = DATOS_CARRERAS[index].idnomenclaturaPeriodo;
                 let CARRERA_FOLIO =  DATOS_CARRERAS[index].aspirante_Folio;
                 let CARRERA_IDMATERIA = DATOS_CARRERAS[index].idmaterias
console.time("DATOS_CALIFICACIONES_4")
                DATOS_CALIFICACIONES = await getCalificaciones(CARRERA_PERIODO,CARRERA_FOLIO,CARRERA_IDMATERIA) //periodo, folio,idmateria
                     
                    console.log(DATOS_CALIFICACIONES)
                     console.timeEnd("DATOS_CALIFICACIONES_4")
                     //console.log(DATOS_CARRERAS[index].nombre)
                     //console.log(DATOS_CALIFICACIONES)
                     //CLAVE - MATERIA/DOCENTE - CREDITOS - CALIFICACION_FINAL - OPCION
                        let CLAVE = DATOS_CARRERAS[index].claveMateria;
                        let MATERIA = DATOS_CARRERAS[index].nomcorto;
                        let DOCENTES_NOMBRE = DATOS_CARRERAS[index].nombres;
                        let DOCENTES_PATERNO = DATOS_CARRERAS[index].apellidoPaterno;
                        let DOCENTES_MATERNO = DATOS_CARRERAS[index].apellidoMaterno;
                        let CREDITOS = DATOS_CARRERAS[index].creditos;
                       // var OPCION = [];
                            //CALIFICACIONES CALCULO
                     if(DATOS_CALIFICACIONES.length > 0){
                            var PROMEDIOS_SUMAS = 0;
                            var PROMEDIOFINAL = 0 ;
                            var message="1RA. OPORT."
                          

                                for (let index2 = 0; index2 < DATOS_CALIFICACIONES.length; index2++) {
                                    let calificaciontotal = parseInt(DATOS_CALIFICACIONES[index2].calificaciontotal || 0)
                                   // OPCION = parseInt(DATOS_CALIFICACIONES[index2].opcion || 0)
                                    PROMEDIOS_SUMAS = PROMEDIOS_SUMAS+calificaciontotal;
                                }
                                PROMEDIOFINAL =  Math.round(PROMEDIOS_SUMAS/DATOS_CALIFICACIONES.length)

                                var OPCION = await DATOS_CALIFICACIONES.filter(function(tem) {
                                    return tem.opcion === 2;
                                });

                                if(OPCION.length > 0 && PROMEDIOFINAL >= 70){
                                    message="2RA. OPORT."
                                }else if ((OPCION.length > 0 && PROMEDIOFINAL < 70) || (OPCION.length === 0 && PROMEDIOFINAL < 70) ){
                                    message = "NO ACREDITADA"
                                }

                            }else{
                                PROMEDIOFINAL = 0
                                message = "NO ACREDITADA"
                            }
                                // 1opcion = 0 , 2 opcion > 0 , nocursado ===11
                                //console.log("promedio")
                              //  console.log(PROMEDIOFINAL)

                                DATOS_BOLETA_FINAL[index]={
                                    clave:CLAVE,
                                    materia:MATERIA,
                                    docente:DOCENTES_NOMBRE + ' '+DOCENTES_PATERNO+' '+DOCENTES_MATERNO,
                                    creditos:CREDITOS,
                                    calificacion:PROMEDIOFINAL,
                                    opcion:message
                                }

                               // console.log(DATOS_BOLETA_FINAL)

            }

  //  }// fin 

    let PROMEDIO_SUMA = 0;
    var CREDITOS_SUMA = 0;
    var CREDITOS_REPROBADOS = 0;
    let MATERIAS_REPROBADAS_CONTADOR = 0;
    var MATERIAS_REPROBADAS = 0;


            for (let i = 0; i < DATOS_BOLETA_FINAL.length; i++) {
                PROMEDIO_SUMA = PROMEDIO_SUMA + ((DATOS_BOLETA_FINAL[i].calificacion >= 70 )? DATOS_BOLETA_FINAL[i].calificacion : 0)
                CREDITOS_SUMA = CREDITOS_SUMA + DATOS_BOLETA_FINAL[i].creditos

                if(DATOS_BOLETA_FINAL[i].calificacion >= 70){
                    MATERIAS_REPROBADAS_CONTADOR++;
                    CREDITOS_REPROBADOS=CREDITOS_REPROBADOS + DATOS_BOLETA_FINAL[i].creditos
                   // console.log(CREDITOS_REPROBADOS)
                }
            }
            
            var PROMEDIO = Math.round(PROMEDIO_SUMA/DATOS_BOLETA_FINAL.length)
            MATERIAS_REPROBADAS = (DATOS_BOLETA_FINAL.length - MATERIAS_REPROBADAS_CONTADOR)
            //console.log('DATOS_BOLETA_FINAL')
            //console.log(DATOS_BOLETA_FINAL)
            //console.log('DATOSCARRERA_ASPIRENTES')
            //console.log(DATOSCARRERA_ASPIRENTES)
            //console.log(PROMEDIO)
          //  console.log(CREDITOS_SUMA)
             
            for (let x = 0; x < DATOS_BOLETA_FINAL.length; x++) {
                //PDF[x].calificacion = (DATOS_BOLETA_FINAL[x].calificacion >= 70) ? DATOS_BOLETA_FINAL[x].calificacion:DATOS_BOLETA_FINAL[x].calificacion
                PDF[x].calificacion = (DATOS_BOLETA_FINAL[x].calificacion >= 70) ? DATOS_BOLETA_FINAL[x].calificacion:"NA"
                PDF[x].clave = DATOS_BOLETA_FINAL[x].clave
                PDF[x].creditos = DATOS_BOLETA_FINAL[x].creditos
                PDF[x].docente = DATOS_BOLETA_FINAL[x].docente
                PDF[x].materia = DATOS_BOLETA_FINAL[x].materia
                PDF[x].opcion = DATOS_BOLETA_FINAL[x].opcion
            }
//boletaAlumno(TODOS_LOS_PDF,PROMEDIO,CREDITOS_SUMA,ASPIRANTE_CONTROL,ASPIRANTE_NOMBRE,ASPIRANTE_PATERNO,ASPIRANTE_MATERNO,ASPIRANTE_CARRERA,ASPIRANTE_RANGO_PERIODO,ASPIRANTE_NUMERO_PERIODO,CREDITOS_REPROBADOS,MATERIAS_REPROBADAS)

            INFORMACIONASPIRANTE[0].creditosAprobados = CREDITOS_REPROBADOS
            INFORMACIONASPIRANTE[0].materiasReprobadas = MATERIAS_REPROBADAS
            INFORMACIONASPIRANTE[0].nombreAspirante = ASPIRANTE_NOMBRE + ' '+ASPIRANTE_PATERNO + ' ' + ASPIRANTE_MATERNO
            INFORMACIONASPIRANTE[0].nombreCarrera=ASPIRANTE_CARRERA
            INFORMACIONASPIRANTE[0].nomeroControl= ASPIRANTE_CONTROL
            INFORMACIONASPIRANTE[0].numeroPeriodo= ASPIRANTE_NUMERO_PERIODO
            INFORMACIONASPIRANTE[0].rangoPeriodo=ASPIRANTE_RANGO_PERIODO
            INFORMACIONASPIRANTE[0].totalCreditos=CREDITOS_SUMA
            INFORMACIONASPIRANTE[0].promedio = PROMEDIO

            TODOS_LOS_PDF.push({"alumno":PDF})//guardar boletas
            TODOS_LOS_PDF_INFORMACION.push({"alumno":INFORMACIONASPIRANTE})
            //GUARDAR PROMEDIOS
                         /* let INFORMACIONASPIRANTE = [{
                             nomeroControl:'',
                             numeroPeriodo:'',
                             rangoPeriodo:'',
                              nombrecCarrera:'',
                              nombreAspirante:'',
                               promedio:'',
                               materiasReprobadas:'',
                               totelCreditos:'',
                                   creditosAprobados:''
        
                                 }]*/
        

            
           // console.log(TODOS_LOS_PDF)
            //console.log(TODOS_LOS_PDF_INFORMACION)

            


//PASAR DATOS AL PDF BOLETAS FINAL
//boletaAlumno(TODOS_LOS_PDF,PROMEDIO,CREDITOS_SUMA,ASPIRANTE_CONTROL,ASPIRANTE_NOMBRE,ASPIRANTE_PATERNO,ASPIRANTE_MATERNO,ASPIRANTE_CARRERA,ASPIRANTE_RANGO_PERIODO,ASPIRANTE_NUMERO_PERIODO,CREDITOS_REPROBADOS,MATERIAS_REPROBADAS)

 }// fin 
 else{
    swal('', `Error`, 'warning');
 }
}//fin for carrera

boletacarrera(TODOS_LOS_PDF,PROMEDIO,CREDITOS_SUMA,ASPIRANTE_CONTROL,ASPIRANTE_NOMBRE,ASPIRANTE_PATERNO,ASPIRANTE_MATERNO,ASPIRANTE_CARRERA,ASPIRANTE_RANGO_PERIODO,ASPIRANTE_NUMERO_PERIODO,CREDITOS_REPROBADOS,MATERIAS_REPROBADAS,TODOS_LOS_PDF_INFORMACION)


} else{
    swal('', `No se encontró ${ID_CARRERA.label} en el semestre: ${SEMESTRE}`, 'warning');
}//fin else carrera


} catch (error) {
    swal('!', ` ${error}`, 'warning');     
}

}



