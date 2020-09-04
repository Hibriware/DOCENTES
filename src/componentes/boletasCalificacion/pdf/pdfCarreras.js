import moment from 'moment';
import jsPDF from 'jspdf';
import{img} from './img';

export function boletacarrera(PDF,TODOS_LOS_PDF_INFORMACION,NOMBRE_CARRERA_ASPIRANTES) {

    //console.log(PDF)
 
    var doc = new jsPDF('p', 'pt', 'letter');

   // doc.addPage(1);
  // doc.setPage(i);
  
   
     for (var i = 0; i < PDF.length; i++) {
        doc.addImage(img, 'JPEG', 8, 8, 70, 70)
        doc.addImage(img, 'JPEG', 8, 420, 70, 70)
        doc.setFontSize(14); //encabezado
        doc.text(130, 15, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS');
        doc.line(100, 17, 500, 17); // horizontal line
        doc.setFontSize(8);
        doc.text(262, 26, 'BOLETA DE CALIFICACIONES');
    
        doc.line(140, 45, 420, 45);
        doc.line(130, 45, 80, 45);
        //header informacion<<<<<<<<<<<<
        doc.setFontSize(8);
        doc.text(90, 42, `${TODOS_LOS_PDF_INFORMACION[i].alumno[0].nomeroControl}`);//numero de control
        doc.setFontSize(8);
        doc.text(140, 42,`${TODOS_LOS_PDF_INFORMACION[i].alumno[0].nombreAspirante}`);//nombre aspirante
        doc.setFontSize(8);
        doc.text(90, 54, "CARRERA:");
        doc.setFontSize(8);
        doc.text(140, 54,`${TODOS_LOS_PDF_INFORMACION[i].alumno[0].nombreCarrera}`);//carrera nombre
    
        doc.setFontSize(8);
        doc.text(500, 31, `PERIODO: ${TODOS_LOS_PDF_INFORMACION[i].alumno[0].rangoPeriodo}`);//periodo rango
        doc.setFontSize(8);
        doc.text(500, 40, `FECHA: ${moment(new Date()).format('DD/MM/YYYY')}`);
    
        doc.setFontSize(8);
        doc.text(500, 66, `NPRDO:${TODOS_LOS_PDF_INFORMACION[i].alumno[0].numeroPeriodo}`);//numero periodo
    
        doc.setFontSize(8);//informacion jefe scolar
        doc.text(30, 378, `ING. GELSI OLIVIA VERA LEZAMA`);
        doc.text(30, 385, `JEFE DEL DEPTO. DE SERVICIOS ESCOLARES`);
        doc.setFontSize(8);//informacion jefe scolar
        doc.text(495, 378, `ALUMNO`);
    
        //PROMEDO GENERL Y GREDITOS
         doc.setFontSize(8);//informacion jefe scolar
         doc.text(251, 328, `PROMEDIO:`);
         doc.text(320, 327,`${TODOS_LOS_PDF_INFORMACION[i].alumno[0].promedio}` );
         doc.text(242, 340, `MAT.REPROB:`);
         doc.text(320, 340, `${TODOS_LOS_PDF_INFORMACION[i].alumno[0].materiasReprobadas}`);
         doc.text(253, 357, `CREDITOS:`);
         doc.text(320, 355, `${TODOS_LOS_PDF_INFORMACION[i].alumno[0].totalCreditos}`);
         doc.text(253, 369, `CRED.APR:`);
         doc.text(320, 369, `${TODOS_LOS_PDF_INFORMACION[i].alumno[0].creditosAprobados}`);
       
    //cuadros calificaciones HEADER CALIFICACIONS
        doc.setFontSize(8);
        doc.text(75, 109, "CLAVE");
        doc.setFontSize(8);
        doc.text(180, 109, "MATERIA/DOCENTE");
        doc.setFontSize(8);
        doc.text(360, 109, "CRED.");
        doc.setFontSize(8);
        doc.text(410, 109, "CALIF.");
        doc.setFontSize(8);
        doc.text(480, 109, "OPCION");
        
        //NOMBRE MATERIAS Y DOCENTE
     doc.setFontSize(8);    //LISTA 1 INICIO
        doc.text(74, 125, `${PDF[i].alumno[0].clave}`); ///clave
            doc.setFontSize(8);
        doc.text(140, 118, `${PDF[i].alumno[0].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 128, `${PDF[i].alumno[0].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 125, `${PDF[i].alumno[0].creditos}`);//credito
            doc.setFontSize(10);
        doc.text(415, 125, `${PDF[i].alumno[0].calificacion}`);//calificacion
        doc.setFontSize(8);
        doc.text(470, 125, `${PDF[i].alumno[0].opcion}`);//FIN LISTA 1, opcion 
        
        doc.setFontSize(8);//LISTA 2 INICIO
        doc.text(74, 140, `${PDF[i].alumno[1].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 138,`${PDF[i].alumno[1].materia}` );//materia
            doc.setFontSize(8);
        doc.text(140, 148, `${PDF[i].alumno[1].docente}`);//doncente
        doc.setFontSize(9);
        doc.text(365, 145, `${PDF[i].alumno[1].creditos}`);//credito
            doc.setFontSize(10);
        doc.text(415, 145,`${PDF[i].alumno[1].calificacion}`);//calificacion
        doc.setFontSize(8);
        doc.text(470, 145, `${PDF[i].alumno[1].opcion}`);//FIN LISTA 2, opocion
        
        doc.setFontSize(8);//LISTA 3 INICIO
        doc.text(74, 160, `${PDF[i].alumno[2].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 158,`${PDF[i].alumno[2].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 168, `${PDF[i].alumno[2].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 165,`${PDF[i].alumno[2].creditos}`);//creditos
            doc.setFontSize(10);
        doc.text(415, 165,`${PDF[i].alumno[2].calificacion}`);//calificacion
        doc.setFontSize(8);
        doc.text(470, 165, `${PDF[i].alumno[2].opcion}`);//FIN LISTA 3, opcion
        
            doc.setFontSize(8);//LISTA 4 INICIO
        doc.text(74, 180, `${PDF[i].alumno[3].clave}`);//clav
            doc.setFontSize(8);
        doc.text(140, 178, `${PDF[i].alumno[3].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 188, `${PDF[i].alumno[3].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 185, `${PDF[i].alumno[3].creditos}`);//creditos
            doc.setFontSize(10);
        doc.text(415, 185, `${PDF[i].alumno[3].calificacion}`);//calificacio
        doc.setFontSize(8);
        doc.text(470, 185, `${PDF[i].alumno[3].opcion}`);//FIN LISTA 4, opcion
        
                doc.setFontSize(8);//LISTA 5 INICIO
        doc.text(74, 200, `${PDF[i].alumno[4].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 198,`${ PDF[i].alumno[4].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 208,`${PDF[i].alumno[4].docente}` );//docente
        doc.setFontSize(9);
        doc.text(365, 205,`${PDF[i].alumno[4].creditos}`) ;//creditos
            doc.setFontSize(10);
        doc.text(415, 205, `${PDF[i].alumno[4].calificacion}`);//clificacion
        doc.setFontSize(8);
        doc.text(470, 205,`${PDF[i].alumno[4].opcion}`);//FIN LISTA 5, opcion
        
                    doc.setFontSize(8);//LISTA 6 INICIO
        doc.text(74, 220, `${PDF[i].alumno[5].clave}` );//clave
            doc.setFontSize(8);
        doc.text(140, 218, `${PDF[i].alumno[5].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 228, `${PDF[i].alumno[5].docente}` );//docente
        doc.setFontSize(9);
        doc.text(365, 225,`${PDF[i].alumno[5].creditos}` );//credito
            doc.setFontSize(10);
        doc.text(415, 225, `${PDF[i].alumno[5].calificacion}` );//calificacion
        doc.setFontSize(8);
        doc.text(470, 225, `${PDF[i].alumno[5].opcion}` );//FIN LISTA 6, opcion
        
        
                    doc.setFontSize(8);//LISTA 7 INICIO
        doc.text(74, 240,`${PDF[i].alumno[6].clave}` );//clave
            doc.setFontSize(8);
        doc.text(140, 238,`${PDF[i].alumno[6].materia}`);//maeria
            doc.setFontSize(8);
        doc.text(140, 248,`${PDF[i].alumno[6].docente}`);// docente
        doc.setFontSize(9);
        doc.text(365, 245, `${PDF[i].alumno[6].creditos}`);//creditos
            doc.setFontSize(10);
        doc.text(415, 245,`${PDF[i].alumno[6].calificacion}` );//calificacion
        doc.setFontSize(8);
        doc.text(470, 245,`${PDF[i].alumno[6].opcion}`);//FIN LISTA 7, opcion
        
        
                        doc.setFontSize(8);//LISTA 8 INICIO
        doc.text(74, 260, `${PDF[i].alumno[7].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 258, `${PDF[i].alumno[7].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 268,`${PDF[i].alumno[7].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 265,`${PDF[i].alumno[7].creditos}`);//credito
            doc.setFontSize(10);
        doc.text(415, 265, `${PDF[i].alumno[7].calificacion}`);//calificacion
        doc.setFontSize(8);
        doc.text(470, 265,`${PDF[i].alumno[7].opcion}`);//FIN LISTA 8,opcion
         //cuadrocalificacion
         doc.setDrawColor(0)
         doc.setFillColor(255, 255, 255)
         doc.roundedRect(70, 100, 470, 200, 3, 3, null) //lista
    doc.setLineWidth(0)
        doc.line(70, 110, 540, 110)//1
        doc.line(120, 119, 350, 119)//1.0
        doc.line(70, 130, 540, 130)//2
        doc.line(120, 139, 350, 139)//2.0
         doc.line(70, 150, 540, 150)//3
         doc.line(120, 159, 350, 159)//3.0
          doc.line(70, 170, 540, 170)//4
          doc.line(120, 179, 350, 179)//4.0
           doc.line(70, 190, 540, 190)//5
           doc.line(120, 199, 350, 199)//5.0
            doc.line(70, 210, 540, 210)//6
            doc.line(120, 219, 350, 219)//6.0
             doc.line(70, 230, 540, 230)//7
             doc.line(120, 239, 350, 239)//7.0
           doc.line(70, 250, 540, 250)//8
            doc.line(120, 259, 350, 259)//8.0
           doc.line(70, 270, 540, 270)//9
           doc.setLineWidth(0)
    doc.line(120, 300, 120, 100)
    doc.line(350, 300, 350, 100)
    doc.line(390, 300, 390, 100)
    doc.line(450, 300, 450, 100)
        
    
    // Black sqaure with rounded corners
    doc.setDrawColor(0)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(300, 310, 54, 65, 3, 3, null) //promedio
            doc.setLineWidth(0)
            doc.line(300, 330, 354, 330)//1
            doc.line(300, 345, 354, 345)//2
            doc.line(300, 360, 354, 360)//2
            // firmas
            doc.line(30, 370, 200, 370)//fila jefe
            doc.line(430, 370, 590, 370)//fila jefe
    
    // SEGUNDA boleta              ********************
    //---------------------
    doc.setFontSize(14); //encabezado
        doc.text(130, 425, 'INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS');
        doc.line(100, 427, 500, 427); // horizontal line
        doc.setFontSize(8);
        doc.text(262, 435, 'BOLETA DE CALIFICACIONES');
            //header informacion<<<<<<<<<<<<
        doc.setFontSize(8);
        doc.text(90, 454, `${TODOS_LOS_PDF_INFORMACION[i].alumno[0].nomeroControl}`);//numero de control
        doc.setFontSize(8);
        doc.text(140, 454,`${TODOS_LOS_PDF_INFORMACION[i].alumno[0].nombreAspirante}`); //nombre aspirante
        doc.setFontSize(8);
        doc.text(90, 464, "CARRERA:");
        doc.setFontSize(8);
        doc.text(140, 464,`${TODOS_LOS_PDF_INFORMACION[i].alumno[0].nombreCarrera}`); //nombre carrera
    
        doc.setFontSize(8);
        doc.text(500, 445, `PERIODO: ${TODOS_LOS_PDF_INFORMACION[i].alumno[0].rangoPeriodo}`); // rango periodo
        doc.setFontSize(8);
        doc.text(500, 455, `FECHA: ${moment(new Date()).format('DD/MM/YYYY')}`);
    
        doc.setFontSize(8);
        doc.text(500, 472, `NPRDO:${TODOS_LOS_PDF_INFORMACION[i].alumno[0].numeroPeriodo}`); //numero periodo
    
        doc.setFontSize(8);//informacion jefe scolar
        doc.text(30, 778, `ING. GELSI OLIVIA VERA LEZAMA`);
        doc.text(30, 786, `JEFE DEL DEPTO. DE SERVICIOS ESCOLARES`);
        doc.setFontSize(8);//informacion jefe scolar
        doc.text(495, 778, `ALUMNO`);
          //PROMEDO GENERL Y GREDITOS
         doc.setFontSize(8);//informacion jefe scolar
        doc.text(251, 728, `PROMEDIO:`);
        doc.text(320, 727,`${TODOS_LOS_PDF_INFORMACION[i].alumno[0].promedio}`);//promedio
        doc.text(242, 740, `MAT.REPROB:`);
        doc.text(320, 741,  `${TODOS_LOS_PDF_INFORMACION[i].alumno[0].materiasReprobadas}`); //materias reprobadas
        doc.text(253, 757, `CREDITOS:`);
          doc.text(320, 755, `${TODOS_LOS_PDF_INFORMACION[i].alumno[0].totalCreditos}`); //creditos totl
        doc.text(253, 769, `CRED.APR:`);
        doc.text(320, 769, `${TODOS_LOS_PDF_INFORMACION[i].alumno[0].creditosAprobados}`); //creditos aprobados
    
        doc.line(140, 455, 420, 455);
        doc.line(130, 455, 80, 455);
        //cuadro calificaciones HEDR CALIFICACION
         doc.setFontSize(8);
        doc.text(75, 508, "CLAVE");
        doc.setFontSize(8);
        doc.text(180, 509, "MATERIA/DOCENTE");
        doc.setFontSize(8);
        doc.text(360, 509, "CRED.");
        doc.setFontSize(8);
        doc.text(410, 509, "CALIF.");
        doc.setFontSize(8);
        doc.text(480, 509, "OPCION");
        
        
        //NOMBRE MATERIAS Y DOCENTE
     doc.setFontSize(8);    //LISTA 1 INICIO
        doc.text(74, 525, `${PDF[i].alumno[0].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 518, `${PDF[i].alumno[0].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 528, `${PDF[i].alumno[0].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 525, `${PDF[i].alumno[0].creditos}`);//critero
            doc.setFontSize(10);
        doc.text(415, 525, `${PDF[i].alumno[0].calificacion}`);//calificacion
        doc.setFontSize(8);
        doc.text(470, 525, `${PDF[i].alumno[0].opcion}`);//FIN LISTA 1 opcion
        
        doc.setFontSize(8);//LISTA 2 INICIO
        doc.text(74, 540, `${PDF[i].alumno[1].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 538,`${PDF[i].alumno[1].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 548, `${PDF[i].alumno[1].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 545, `${PDF[i].alumno[1].creditos}`);//criterio
            doc.setFontSize(10);
        doc.text(415, 545, `${PDF[i].alumno[1].calificacion}`);//calificacions
        doc.setFontSize(8);
        doc.text(470, 545,`${PDF[i].alumno[1].opcion}`);//FIN LISTA 2 opcion
        
        doc.setFontSize(8);//LISTA 3 INICIO
        doc.text(74, 560, `${PDF[i].alumno[2].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 558, `${PDF[i].alumno[2].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 568, `${PDF[i].alumno[2].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 565, `${PDF[i].alumno[2].creditos}`);//criterio
            doc.setFontSize(10);
        doc.text(415, 565, `${PDF[i].alumno[2].calificacion}`);//calificacion
        doc.setFontSize(8);
        doc.text(470, 565,`${PDF[i].alumno[2].opcion}`);//FIN LISTA 3 opcion
        
            doc.setFontSize(8);//LISTA 4 INICIO
        doc.text(74, 580, `${PDF[i].alumno[3].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 578, `${PDF[i].alumno[3].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 588, `${PDF[i].alumno[3].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 585, `${PDF[i].alumno[3].creditos}`);//criterio
            doc.setFontSize(10);
        doc.text(415, 585, `${PDF[i].alumno[3].calificacion}`);//calificacion
        doc.setFontSize(8);
        doc.text(470, 585, `${PDF[i].alumno[3].opcion}`);//FIN LISTA 4 opcion
        
                doc.setFontSize(8);//LISTA 5 INICIO
        doc.text(74, 600, `${PDF[i].alumno[4].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 598, `${PDF[i].alumno[4].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 608, `${PDF[i].alumno[4].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 605, `${PDF[i].alumno[4].creditos}`);//criterio
            doc.setFontSize(10);
        doc.text(415, 605, `${PDF[i].alumno[4].calificacion}`);//calificaciones
        doc.setFontSize(8);
        doc.text(470, 605, `${PDF[i].alumno[4].opcion}`);//FIN LISTA 5 opciones
        
                    doc.setFontSize(8);//LISTA 6 INICIO
        doc.text(74, 620, `${PDF[i].alumno[5].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 618,`${PDF[i].alumno[5].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 628,`${PDF[i].alumno[5].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 625, `${PDF[i].alumno[5].creditos}`);//credito
            doc.setFontSize(10);
        doc.text(415, 625, `${PDF[i].alumno[5].calificacion}`);//calificacion
        doc.setFontSize(8);
        doc.text(470, 625, `${PDF[i].alumno[5].opcion}`);//FIN LISTA 6 opciones
        
        
                    doc.setFontSize(8);//LISTA 7 INICIO
        doc.text(74, 640, `${PDF[i].alumno[6].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 638, `${PDF[i].alumno[6].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 648, `${PDF[i].alumno[6].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 645,`${PDF[i].alumno[6].creditos}`);//criterio
            doc.setFontSize(10);
        doc.text(415, 645, `${PDF[i].alumno[6].calificacion}`);//calificacions
        doc.setFontSize(8);
        doc.text(470, 645, `${PDF[i].alumno[6].opcion}`);//FIN LISTA 7 opciones
        
        
                        doc.setFontSize(8);//LISTA 8 INICIO
        doc.text(74, 660, `${PDF[i].alumno[7].clave}`);//clave
            doc.setFontSize(8);
        doc.text(140, 658,`${PDF[i].alumno[7].materia}`);//materia
            doc.setFontSize(8);
        doc.text(140, 668, `${PDF[i].alumno[7].docente}`);//docente
        doc.setFontSize(9);
        doc.text(365, 665,`${PDF[i].alumno[7].creditos}`);//criterio
            doc.setFontSize(10);
        doc.text(415, 665, `${PDF[i].alumno[7].calificacion}`);//calificacions
        doc.setFontSize(8);
        doc.text(470, 665, `${PDF[i].alumno[7].opcion}`);//FIN LISTA 8 opciones
        
        
        
            doc.setDrawColor(0)
            doc.setFillColor(255, 255, 255)
            doc.roundedRect(70, 500, 470, 200, 3, 3, null) //lista
             doc.setLineWidth(0)//filass
             doc.line(70, 510, 540, 510)//1
             doc.line(120, 519, 350, 519)//1.0
              doc.line(70, 530, 540, 530)//2
             doc.line(120, 539, 350, 539)//2.0
             doc.line(70, 550, 540, 550)//3
             doc.line(120, 559, 350, 559)//3.0
              doc.line(70, 570, 540, 570)//4
              doc.line(120, 579, 350, 579)//4.0
               doc.line(70, 590, 540, 590)//5
               doc.line(120, 599, 350, 599)//5.0
                 doc.line(70, 610, 540, 610)//6
                doc.line(120, 619, 350, 619)//6.0
                doc.line(70, 630, 540, 630)//7
                 doc.line(120, 639, 350, 639)//7.0
               doc.line(70, 650, 540, 650)//8
               doc.line(120, 659, 350, 659)//8.0
              doc.line(70, 670, 540, 670)//9
              //lineas
               doc.setLineWidth(0)
                    doc.line(120, 700, 120, 500)
                    doc.line(350, 700, 350, 500)
                    doc.line(390, 700, 390, 500)
                    doc.line(450, 700, 450, 500)
        
            
            
            
            //cuadro promedio
                doc.setDrawColor(0)
                doc.setFillColor(255, 255, 255)
                doc.roundedRect(300, 710, 54, 65, 3, 3, null) //promedio
                doc.setLineWidth(0)
                 doc.line(300, 730, 354, 730)//1
                 doc.line(300, 745, 354, 745)//2
                   doc.line(300, 760, 354, 760)//2
                   // firmas
            doc.line(30, 770, 200, 770)//fila jefe
            doc.line(430, 770, 590, 770)//fila jefe
    //---------------------

    doc.addPage();

    }

    doc.setFontSize(14); //encabezado
  doc.text(130, 15, 'F I N ');

    doc.save(`${NOMBRE_CARRERA_ASPIRANTES || 'boletas'}.pdf`);
}
