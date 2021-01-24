// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';
  export enum CourseType {
    Ordinary = 'ordinario',
    Repeat = 'repeticion',
    Especial = 'especial',
  }
  
  export interface Career {
    id:number;
    code: string;
    name:string;
    shortName:string;
    modality: 'ESCOLARIZADA' | 'MIXTO';
  }
  
  export interface StudiedSubjects {
    clave: string;
    folio: number;
    materia_docente_id: number;
    materia_id: number;
    periodo: number;
    promedio: string;
    tipo_curso: CourseType;
    total_unidades: number;
    unidades_evaluadas: number;
  }
  
  export interface AvailableSubjectTime {
    startTime: string;
    endTime: string;
  }
  
  export interface Subject {
    dia: string;
    horaFinal: string;
    horaInicio: string;
    asignacionGrupo_idgrupo: number;
    aula: number;
    clave: string;
    creditos: number;
    docente: string;
    idCarrera: number;
    idmateria: number;
    idmaterias: number;
    materiaDocente_id: number;
    nombre: string;
    nomenclatura: string;
    periodo: string;
    personal_id: number;
    plan: string;
    semestreCursando: string;
    semestreMateria: number;
    unidades: number;
    tipo_curso: CourseType;
  }
  
  export interface AvailableSubject {
    monday: AvailableSubjectTime;
    tuesday: AvailableSubjectTime;
    wednesday: AvailableSubjectTime;
    thursday: AvailableSubjectTime;
    friday: AvailableSubjectTime;
    saturday: AvailableSubjectTime;
    sunday: AvailableSubjectTime;
    subject: Subject;
    tableData: {
      id?: number;
      checked: boolean;
    }
  }
  
  export interface ReenrollmentResult {
    semester: number;
    period: number;
    studentId: number;
    teacherSubjectId: number;
    courseType: CourseType;
  }
  
  export interface Student {
    folio: number;
    firstName: string;
    fatherName:string;
    motherName: string;
    phoneNumber:string;
    email: string;
    curp: string;
    gender: string;
    controlNumber:string;
    career: Career;
    currentSemester: number;
    nextSemester:number;
  }
  
  export interface Control {
    numeroControl:string
  }
