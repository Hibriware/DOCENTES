interface ErrorCodes {
    [key: string] : string
  }
  
  export const errorCodes: ErrorCodes = {
    ['auth/email-already-exists']: 'Correo electrónico en uso, puedes solicitar la recuperación de tu contraseña',
    ['auth/email-already-in-use']: 'Correo electrónico en uso, puedes solicitar la recuperación de tu contraseña',
    ['auth/invalid-email']: 'Correo electrónico inválido',
    ['auth/user-not-found']: 'No existe ningún registro de usuario que corresponda al identificador proporcionado.',
  
  }
  