import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  errorMessage: string = ""; // Mensaje de error

  // Definición del formulario de inicio de sesión
  loginForm = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Asegurarte de que no sean null o undefined
      this.userService.login({
        email: formData.email as string,
        password: formData.password as string
      }).subscribe({
        next: (response: any) => {
          if (response.token) {
            this.authService.setToken(response.token);
            this.router.navigate(["/"]); 
          } else {
            this.errorMessage = response.message || "Credenciales incorrectas. Inténtalo de nuevo.";
          }
        },
        error: (error) => {
          console.error("Error al iniciar sesión", error);
          this.errorMessage = error.error.message || "Credenciales incorrectas. Inténtalo de nuevo.";
        }
      });
    } else {
      this.errorMessage = "Por favor, completa todos los campos correctamente.";
    }
  }
}
