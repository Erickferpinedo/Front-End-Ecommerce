import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService); // Inyección de AuthService

  constructor() {}

  // Método para registrar un nuevo usuario
  register(formData: any): Observable<User> {
    return this.http.post<User>("http://localhost:3000/api/auth/register", formData);
  }

  // Método para iniciar sesión
  login(formData: { email: string; password: string }): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>("http://localhost:3000/api/auth/login", {
      email: formData.email,
      password: formData.password,
    }).pipe(
      tap(response => {
        this.authService.setToken(response.token); // Almacena el token usando AuthService
      })
    );
  }

  // Método para recuperar el perfil del usuario
  fetchUserProfile(): Observable<User> {
    const token = this.authService.getToken(); // Obtén el token
    return this.http.get<User>("http://localhost:3000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}` // Agrega el token en los encabezados
      }
    }).pipe(
      tap(profile => {
        console.log('Perfil del usuario:', profile); // Para depuración
      })
    );
  }

  // Método para verificar si el usuario está autenticado
  isLogged(): boolean {
    return this.authService.isLogged();
  }
}
