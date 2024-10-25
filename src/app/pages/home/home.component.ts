import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoDestacadoComponent } from '../../components/producto-destacado/producto-destacado.component';
import { SectionCategoriesComponent } from "../../components/section-categories/section-categories.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductoDestacadoComponent, SectionCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}

