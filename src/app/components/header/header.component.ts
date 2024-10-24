import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    const nav = document.querySelector('#nav');
    const open = document.querySelector('#open');
    const close = document.querySelector('#close');
    const overlay = document.querySelector('#overlay ');

    open?.addEventListener('click', () => {
      nav?.classList.add('visible');
      overlay?.classList.add('active');
      console.log('se abrio pero no se aplico la clase');
    });

    close?.addEventListener('click', () => {
      nav?.classList.remove('visible');
      overlay?.classList.remove('active');
      console.log('se cerro pero no se aplico la clase');
    });

    open?.addEventListener('click', function () {
      document.querySelector('.nav-hamburguer')?.classList.add('menu-open');
    });

    close?.addEventListener('click', function () {
      document.querySelector('.nav-hamburguer')?.classList.remove('menu-open');
    });

    overlay?.addEventListener('click', () => {
      nav?.classList.remove('visible');
      overlay.classList.remove('active');
    });
  }

  @ViewChild('dropdownContent', { static: false }) dropdownContent!: ElementRef;

  showMenu() {
    this.dropdownContent.nativeElement.style.display = 'block';
  }

  hideMenu(event: MouseEvent) {
    if (!this.dropdownContent.nativeElement.contains(event.relatedTarget)) {
      this.dropdownContent.nativeElement.style.display = 'none';
    }
  }
}
