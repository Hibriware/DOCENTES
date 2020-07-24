import {getListaCarreras,getCalificaciones,getCatalogoCarrera} from '../servicios/api';
import {boletaAlumno} from './pdfAlumno';
import swal from 'sweetalert';

var calificacions = [];

//BUSCAR ASPIRANTE, CAREERA, PERIODO
 export async function main(PERIODO, NUMERO_CONTROL,SEMESTRE) {

    try {
        
  

    //variables
    var DATOSCARRERA_ASPIRENTES = [];
    var DATOS_CALIFICACIONES = [];
    var DATOS_CARRERAS = [];
    var DATOS_BOLETA_FINAL =[];
    
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
    
    //variables
    
    DATOSCARRERA_ASPIRENTES = await getListaCarreras(PERIODO,NUMERO_CONTROL,SEMESTRE)

    if(DATOSCARRERA_ASPIRENTES.length > 0){
        let BOLETA_ID_CARRERA =  DATOSCARRERA_ASPIRENTES[0].idCarrera;
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
        console.log(DATOSCARRERA_ASPIRENTES)

// ASPIRANTE_CONTROL,ASPIRANTE_NOMBRE,ASPIRANTE_PATERNO,ASPIRANTE_MATERNO,ASPIRANTE_CARRERA,ASPIRANTE_RANGO_PERIODO,ASPIRANTE_NUMERO_PERIODO

      //catalogo/carrera/1/137/7/19 SEMESTRE - FOLIO - PERIODO - IDCARRERA (semestre, folio,periodo,idcarrera)
            DATOS_CARRERAS=  await getCatalogoCarrera(BOLETA_SEMESTRE,BOLETA_FOLIO,BOLETA_PERIODO,BOLETA_ID_CARRERA)
          //  console.log(DATOS_CARRERAS)

            for (let index = 0; index < DATOS_CARRERAS.length; index++) {
                 let CARRERA_PERIODO = DATOS_CARRERAS[index].idnomenclaturaPeriodo;
                 let CARRERA_FOLIO =  DATOS_CARRERAS[index].aspirante_Folio;
                 let CARRERA_IDMATERIA = DATOS_CARRERAS[index].idmaterias

                     DATOS_CALIFICACIONES = await getCalificaciones(CARRERA_PERIODO,CARRERA_FOLIO,CARRERA_IDMATERIA) //periodo, folio,idmateria
                     //console.log(DATOS_CARRERAS[index].nombre)
                   //  console.log(DATOS_CALIFICACIONES)
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
                                    let calificaciontotal = (parseInt(DATOS_CALIFICACIONES[index2].calificaciontotal || 0) < 70 ? -1000:parseInt(DATOS_CALIFICACIONES[index2].calificaciontotal))
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
    let CREDITOS_SUMA = 0;
    var CREDITOS_REPROBADOS = 0;
    let MATERIAS_REPROBADAS_CONTADOR = 0;
    let MATERIAS_REPROBADAS = 0;


            for (let i = 0; i < DATOS_BOLETA_FINAL.length; i++) {
                PROMEDIO_SUMA = PROMEDIO_SUMA + ((DATOS_BOLETA_FINAL[i].calificacion >= 70) ? DATOS_BOLETA_FINAL[i].calificacion:0)
                CREDITOS_SUMA = CREDITOS_SUMA + DATOS_BOLETA_FINAL[i].creditos

                if(DATOS_BOLETA_FINAL[i].calificacion >= 70){
                    MATERIAS_REPROBADAS_CONTADOR++;
                    CREDITOS_REPROBADOS=CREDITOS_REPROBADOS + DATOS_BOLETA_FINAL[i].creditos
                    //console.log(CREDITOS_REPROBADOS)
                }
            }
            
            let PROMEDIO = Math.round(PROMEDIO_SUMA/DATOS_BOLETA_FINAL.length)
            MATERIAS_REPROBADAS = (DATOS_BOLETA_FINAL.length - MATERIAS_REPROBADAS_CONTADOR)
            //console.log('DATOS_BOLETA_FINAL')
            //console.log(DATOS_BOLETA_FINAL)
            //console.log('DATOSCARRERA_ASPIRENTES')
            //console.log(DATOSCARRERA_ASPIRENTES)
            //console.log(PROMEDIO)
          //  console.log(CREDITOS_SUMA)
             
            for (let x = 0; x < DATOS_BOLETA_FINAL.length; x++) {
               // PDF[x].calificacion = (DATOS_BOLETA_FINAL[x].calificacion >= 70) ? DATOS_BOLETA_FINAL[x].calificacion:DATOS_BOLETA_FINAL[x].calificacion
                PDF[x].calificacion = (DATOS_BOLETA_FINAL[x].calificacion >= 70) ? DATOS_BOLETA_FINAL[x].calificacion:"NA"
                PDF[x].clave = DATOS_BOLETA_FINAL[x].clave
                PDF[x].creditos = DATOS_BOLETA_FINAL[x].creditos
                PDF[x].docente = DATOS_BOLETA_FINAL[x].docente
                PDF[x].materia = DATOS_BOLETA_FINAL[x].materia
                PDF[x].opcion = DATOS_BOLETA_FINAL[x].opcion
            }

           

            
            //console.log(PDF)
            


//PASAR DATOS AL PDF BOLETAS FINAL
boletaAlumno(PDF,PROMEDIO,CREDITOS_SUMA,ASPIRANTE_CONTROL,ASPIRANTE_NOMBRE,ASPIRANTE_PATERNO,ASPIRANTE_MATERNO,ASPIRANTE_CARRERA,ASPIRANTE_RANGO_PERIODO,ASPIRANTE_NUMERO_PERIODO,CREDITOS_REPROBADOS,MATERIAS_REPROBADAS)

 }// fin 
 else{
    swal('', `El número de control: ${NUMERO_CONTROL}  , no se encontró en el semestre: ${SEMESTRE}`, 'warning');
 }

} catch (error) {
    swal('', ` ${error}`, 'warning');
}
}



