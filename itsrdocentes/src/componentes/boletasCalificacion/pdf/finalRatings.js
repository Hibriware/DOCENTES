import swal from 'sweetalert';
import {
    getListaCarreras,
    getCalificaciones,
    getCatalogoCarrera,
    getListaControlesCarrera,
    getSearchMatter,
    getMatterRatings
} from '../servicios/api';
import {boletacarrera} from './pdfCarreras';

Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
}

export async function main(PERIODO, ID_CARRERA, SEMESTRE) {


    console.time("LISTA_SEMESTRES_POR_CARRERA_PRIMERA_CONSULTA")
    let LISTA_SEMESTRES_POR_CARRERA = await getListaControlesCarrera(PERIODO, SEMESTRE, ID_CARRERA.value) //LISTA DE SEMESTRES POR CARRERA
    console.timeEnd("LISTA_SEMESTRES_POR_CARRERA_PRIMERA_CONSULTA")
  //  console.log(LISTA_SEMESTRES_POR_CARRERA)

    if (LISTA_SEMESTRES_POR_CARRERA.length > 0) {
    var TODOS_LOS_PDF = []
    var TODOS_LOS_PDF_INFORMACION = []


       

        for (let index = 0; index < LISTA_SEMESTRES_POR_CARRERA.length; index++) {
            var DATOS_BOLETA_FINAL =[];
            var PDF = [
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
        
            }];

            console.log(`Rating: ${index}`)
            //INFORMACION ASPIRANTES
            let FOLIO_ASPIRANTE = LISTA_SEMESTRES_POR_CARRERA[index].Folio
            let NUMERO_CONTROL = LISTA_SEMESTRES_POR_CARRERA[index].numeroControl
            let NOMBRE_ASPIRANTES = LISTA_SEMESTRES_POR_CARRERA[index].nombreAspirante
            var NOMBRE_CARRERA_ASPIRANTES = LISTA_SEMESTRES_POR_CARRERA[index].nombreCarrera
            let RANGO_PERIODO = LISTA_SEMESTRES_POR_CARRERA[index].rangoPeriodo
            let SEMESTRE_MATERIA = LISTA_SEMESTRES_POR_CARRERA[index].semestre





            //comensar materias
            console.time("CONSULTA_2")
            var MATERIAS_ASPIRANTE = await getSearchMatter(FOLIO_ASPIRANTE, NUMERO_CONTROL, PERIODO, SEMESTRE) //folio, control,periodo, semestre
            console.timeEnd("CONSULTA_2")
            //console.log(MATERIAS_ASPIRANTE)
            //console.log(FOLIO_ASPIRANTE)
            const groupedKey = await MATERIAS_ASPIRANTE.groupBy('idmaterias')
            //console.log(groupedKey)//TODAS LAS MATERIAS CON TEMAS
            const numeroDeMaterias = Object.keys(groupedKey)
           // console.log(numeroDeMaterias)

            //CALCULAR PROMEDIO POR TEMAS
            for (let index1 = 0; index1 < numeroDeMaterias.length; index1++) { //inicio for numero de materias

                let materiaEncontrada = []//numero materias
                materiaEncontrada = await MATERIAS_ASPIRANTE.filter(idMaterias =>(idMaterias.idmaterias === parseInt(numeroDeMaterias[index1])));
               // console.log(materiaEncontrada)
                let CLAVE_MATERIA= materiaEncontrada[0].claveMateria
                let NOMBRE_MATERIA = materiaEncontrada[0].nomcorto
                let CREDITO_MATERIA = materiaEncontrada[0].creditos
                let DOCENTE_MATERIA = materiaEncontrada[0].nombreDocente


                //promedio por materia inicio
                    let PROMEDIO_FINAL = [];
                    let CREDITOS_SUMA=0;
                    let sumaCalificacion =0;
                    var message="1RA. OPORT."
                for (let x = 0; x < materiaEncontrada.length; x++) {//unidades  para promedar materias
                    let calilificaciones = parseInt(materiaEncontrada[x].calificaciontotal || 0)
                    sumaCalificacion = sumaCalificacion + calilificaciones;
                }
                    PROMEDIO_FINAL =  Math.round(sumaCalificacion / materiaEncontrada.length) 
                  //  console.log( PROMEDIO_FINAL + "Calificacion totoal")

                    var OPCION = await materiaEncontrada.filter(function(tem) {// buscar 2 opcion
                        return tem.opcion === 2;
                    });

                    if(OPCION.length > 0 && PROMEDIO_FINAL >= 70){
                        message="2RA. OPORT."
                    }else if ((OPCION.length > 0 && PROMEDIO_FINAL < 70) || (OPCION.length === 0 && PROMEDIO_FINAL < 70) ){
                        message = "NO ACREDITADA"
                    }


                // promedio por materia fin

                //guardar materia
                DATOS_BOLETA_FINAL[index1]={
                    clave:CLAVE_MATERIA,
                    materia:NOMBRE_MATERIA,
                    docente:DOCENTE_MATERIA,
                    creditos:CREDITO_MATERIA,
                    calificacion:PROMEDIO_FINAL,
                    opcion:message
                }


            }//fin for numero materias

            //calcular PROMEDIOS Y CREDITOSTOTALES Y CREDITOS APROBADOS
            let PROMEDIO_GENERAL = 0;
            let CREDITOS_GENERAL = 0;
            let CREDITOS_APROBADOS =0;
            let MATERIAS_REPROBADAS = 0;
            let MATERIAS_REPROBADAS_CONTADOR=0
            for (let i = 0; i < DATOS_BOLETA_FINAL.length; i++) {
                PROMEDIO_GENERAL = PROMEDIO_GENERAL + ((DATOS_BOLETA_FINAL[i].calificacion >= 70 )? DATOS_BOLETA_FINAL[i].calificacion : 0)
                CREDITOS_GENERAL = CREDITOS_GENERAL + DATOS_BOLETA_FINAL[i].creditos

                if(DATOS_BOLETA_FINAL[i].calificacion >= 70){
                    MATERIAS_REPROBADAS_CONTADOR++;
                    CREDITOS_APROBADOS=CREDITOS_APROBADOS + DATOS_BOLETA_FINAL[i].creditos
                   // console.log(CREDITOS_REPROBADOS)
                }
                
            }
            var PROMEDIO = Math.round(PROMEDIO_GENERAL/DATOS_BOLETA_FINAL.length)
            MATERIAS_REPROBADAS = (DATOS_BOLETA_FINAL.length - MATERIAS_REPROBADAS_CONTADOR)


            //añadir al controller pdf
            for (let x = 0; x < DATOS_BOLETA_FINAL.length; x++) {
                //PDF[x].calificacion = (DATOS_BOLETA_FINAL[x].calificacion >= 70) ? DATOS_BOLETA_FINAL[x].calificacion:DATOS_BOLETA_FINAL[x].calificacion
                PDF[x].calificacion = (DATOS_BOLETA_FINAL[x].calificacion >= 70) ? DATOS_BOLETA_FINAL[x].calificacion:"NA"
                PDF[x].clave = DATOS_BOLETA_FINAL[x].clave
                PDF[x].creditos = DATOS_BOLETA_FINAL[x].creditos
                PDF[x].docente = DATOS_BOLETA_FINAL[x].docente
                PDF[x].materia = DATOS_BOLETA_FINAL[x].materia
                PDF[x].opcion = DATOS_BOLETA_FINAL[x].opcion
            }

            TODOS_LOS_PDF.push({"alumno":PDF})//guardar boletas

            INFORMACIONASPIRANTE[0].creditosAprobados = CREDITOS_APROBADOS
            INFORMACIONASPIRANTE[0].materiasReprobadas = MATERIAS_REPROBADAS
            INFORMACIONASPIRANTE[0].nombreAspirante = NOMBRE_ASPIRANTES
            INFORMACIONASPIRANTE[0].nombreCarrera=NOMBRE_CARRERA_ASPIRANTES
            INFORMACIONASPIRANTE[0].nomeroControl= NUMERO_CONTROL
            INFORMACIONASPIRANTE[0].numeroPeriodo= SEMESTRE_MATERIA //Semestre
            INFORMACIONASPIRANTE[0].rangoPeriodo=RANGO_PERIODO
            INFORMACIONASPIRANTE[0].totalCreditos=CREDITOS_GENERAL
            INFORMACIONASPIRANTE[0].promedio = PROMEDIO
            TODOS_LOS_PDF_INFORMACION.push({"alumno":INFORMACIONASPIRANTE})
           // console.log(TODOS_LOS_PDF_INFORMACION)

        }//interacion por numero de control
    boletacarrera(TODOS_LOS_PDF,TODOS_LOS_PDF_INFORMACION,NOMBRE_CARRERA_ASPIRANTES)

    }else{
        swal('', `No se encontró ${ID_CARRERA.label} en el semestre: ${SEMESTRE}`, 'warning');
    }



}