export interface User {
    _id?: string;
    firstname: string;
    lastname: string;
    email: string;
    password?: string; // opcional si no se necesita fuera del contexto de autenticación
    avatar?: string; // opcional
  }
  