import axios from 'axios';
import {Student} from '../interfaces';
const urlApi = process.env.REACT_APP_SERVER_HOST

export const me = async (numeroControl:string | undefined): Promise<Student | null> => {
  try {
    const student: any = await axios.get(`${urlApi}/api/alumno/me/control`,{
      params: {
        numeroControl: numeroControl,
      }}).then(result => result.data);
    const {me, semester, nextSemester} = student;
    return {
      career: {
        id: me.carrera1.idCarrera,
        name: me.carrera1.nombreCarrera,
        shortName: me.carrera1.nombreCorto,
        modality: me.carrera1.modalidad,
        code: me.carrera1.clave,
      },
      controlNumber: me.numeroControl,
      curp: me.curp,
      currentSemester: semester,
      nextSemester: nextSemester,
      email: me.email,
      firstName: me.nombreAspirante,
      fatherName: me.apellidoPaterno,
      motherName: me.apellidoMaterno,
      folio: me.Folio,
      gender: me.sexo,
      phoneNumber: me.numeroCelular,
    }
  } catch (e) {
    return null;
  }
}
