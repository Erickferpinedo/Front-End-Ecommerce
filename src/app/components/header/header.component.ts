import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RouterLinkWithHref } from '@angular/router';
import { User } from '../../models/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs'; // Importa throwError aquí


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private userService = inject(UserService);
  public authService = inject(AuthService);
  private router = inject(Router);

  @ViewChild('dropdownContent', { static: false }) dropdownContent!: ElementRef;
  @ViewChild('userMenu', { static: false }) userMenu!: ElementRef;

  menuVisible = false;
  userProfile: User | null = null;

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Asegúrate de obtener el userId desde localStorage
    if (userId) {
      this.fetchUserProfile(userId).subscribe(profile => {
        this.userProfile = profile;
        console.log('User Profile:', this.userProfile);
      });
    }
    this.setupNavMenu();
  }

  private setupNavMenu() {
    const nav = document.querySelector('#nav');
    const open = document.querySelector('#open');
    const close = document.querySelector('#close');
    const overlay = document.querySelector('#overlay');

    open?.addEventListener('click', () => {
      this.toggleNavMenu(nav, overlay, true);
    });

    close?.addEventListener('click', () => {
      this.toggleNavMenu(nav, overlay, false);
    });

    overlay?.addEventListener('click', () => {
      this.toggleNavMenu(nav, overlay, false);
    });
  }

  private toggleNavMenu(nav: Element | null, overlay: Element | null, open: boolean) {
    if (open) {
      nav?.classList.add('visible');
      overlay?.classList.add('active');
      document.querySelector('.nav-hamburguer')?.classList.add('menu-open');
    } else {
      nav?.classList.remove('visible');
      overlay?.classList.remove('active');
      document.querySelector('.nav-hamburguer')?.classList.remove('menu-open');
    }
  }

  fetchUserProfile(userId: string): Observable<User> {
    const token = localStorage.getItem('token') ?? '';
  
    return this.userService.fetchUserProfile(userId).pipe(
      tap((profile) => {
        console.log('Perfil del usuario:', profile);
        this.userProfile = profile; // Mueve esto aquí para estar seguro de que se asigne correctamente
        console.log('Avatar del usuario:', this.userProfile?.avatar);
      }),
      catchError(this.handleError('Error al obtener el perfil del usuario'))
    );
  }
  

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    console.log('Menú visible:', this.menuVisible);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.dropdownContent || !this.userMenu) {
      return;
    }

    const isDropdownClicked = this.dropdownContent.nativeElement.contains(event.target);
    const isUserProfileClicked = this.userMenu.nativeElement.contains(event.target);

    if (!isDropdownClicked && !isUserProfileClicked) {
      this.menuVisible = false;
    }
  }

  isLogged() {
    return this.authService.isLogged();
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }

  getUserAvatar() {
    return this.userProfile?.avatar || 'assets/images/default-avatar.png'; // Usa el avatar del usuario o una imagen por defecto
  }

  private handleError(defaultMessage: string) {
    return (error: any) => {
      const errorMessage = error.error?.message || defaultMessage; // Mensaje específico del servidor
      console.error(defaultMessage, error);
      return throwError(() => new Error(errorMessage));
    };
  }
}
