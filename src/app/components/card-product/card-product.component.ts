
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.Service';
import { Producto } from '../../models/producto.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {

private cartService = inject(CartService)

@Input() producto: any;

productQuantity = new FormControl(0);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.producto) {
      this.productQuantity.setValue(this.producto.quantity);
    }
  }

  increment(productId: string) {
    this.cartService.incrementQuantity(productId)
  }

  decrement(productId: string) {
    this.cartService.decrementQuantity(productId)
  }

  delete(productId: string) {
    this.cartService.deleteProduct(productId)
  }
}


