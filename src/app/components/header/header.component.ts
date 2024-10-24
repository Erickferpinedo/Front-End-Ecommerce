import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RouterLinkWithHref } from '@angular/router';
import { User } from '../../models/user.model';

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
    this.fetchUserProfile();
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

  fetchUserProfile() {
    if (this.authService.isLogged()) {
      this.userService.fetchUserProfile().subscribe({
        next: (profile) => {
          this.userProfile = profile; 
        },
        error: (error) => {
          console.error('Error fetching user profile:', error.message || error);
        }
      });
    }
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
}
