const urlApi = process.env.REACT_APP_SERVER_HOST

export const COURSED_SUBJECTS_URL = urlApi+'/api/reinscripcion/materias-cursadas/folio';
export const ENROLLED_SUBJECTS_BY_PERIOD_URL = urlApi+'/api/reinscripcion/materias-inscrito/admin';
export const AVAILABLE_CAREERS_URL = urlApi+'/api/reinscripcion/disponibilidad/admin';
export const AVAILABLE_SUBJECTS_URL = urlApi+'/api/reinscripcion/materias/admin';
export const REENROLLMENT_URL = urlApi+'/api/reinscripcion/reinscribir';
export const CURP_VALIDATION_URL = urlApi+'/api/login/student/validate-by-curp';
export const REGISTER_ACCOUNT = urlApi+'/api/login/student/register-account';

export const AVAILABLE_SUBJECTS_ALL_URL = urlApi+'/api/reinscripcion/materias/todas/admin';

