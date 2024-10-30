import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cartService';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos: { product: Producto; quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productos = this.cartService.getCartItems();
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  getTotal() {
    return this.productos.reduce((total, item) => total + item.product.precio * item.quantity, 0);
  }
}
