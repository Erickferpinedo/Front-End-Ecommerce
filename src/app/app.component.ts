import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductoDestacadoComponent } from './components/producto-destacado/producto-destacado.component';
import { SectionCategoriesComponent } from './components/section-categories/section-categories.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,ProductoDestacadoComponent, SectionCategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-detalles-angels';
}
