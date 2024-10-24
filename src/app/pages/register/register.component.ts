import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule], // Agrega CommonModule aquí
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  avatar: File | null = null;

  registerForm = new FormGroup({
    firstname: new FormControl("", {
      validators: [Validators.required]
    }),
    lastname: new FormControl("", {
      validators: [Validators.required]
    }),
    email: new FormControl("", {
      validators: [Validators.required, Validators.email] // Añade validación de email
    }),
    password: new FormControl("", {
      validators: [Validators.required]
    })
  });

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatar = file;
    }
  }

  toFormData(formValue: any) {
    const formData = new FormData();
    for (const key in formValue) {
      if (formValue.hasOwnProperty(key) && formValue[key] !== null && formValue[key] !== undefined) {
        formData.append(key, formValue[key]);
      }
    }
    if (this.avatar) {
      formData.append('avatar', this.avatar, this.avatar.name);
    }
    console.log(formData.getAll("avatar")); // Para depuración
    return formData;
  }

  onSubmit() {
    console.log(this.registerForm.value); // Para depuración
    if (this.registerForm.valid && this.avatar) {
      const formData = this.toFormData(this.registerForm.value);
      this.userService.register(formData).subscribe({
        next: response => {
          // Redirigir a la página de inicio después del registro
          this.router.navigate(["/"]); // Asegúrate de que esta ruta sea correcta
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      console.log("Campos no válidos");
    }
  }
}