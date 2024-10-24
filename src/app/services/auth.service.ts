import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  // Almacena el token en localStorage
  setToken(token: string): void {
    localStorage.setItem("user_token", token);
  }

  // Elimina el token y el perfil de localStorage
  removeToken(): void {
    localStorage.removeItem("user_token");
  }

  // Obtiene el token del localStorage
  getToken(): string | null {
    return localStorage.getItem("user_token");
  }

  // Verifica si el usuario está autenticado
  isLogged(): boolean {
    return !!localStorage.getItem("user_token");
  }
}
