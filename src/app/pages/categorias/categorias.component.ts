import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { CardProductComponent } from '../../components/card-product/card-product.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [BannerComponent,CardProductComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

}
