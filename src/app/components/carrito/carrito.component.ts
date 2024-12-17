import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.Service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';

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

  increaseQuantity(index: number) {
    this.productos[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.productos[index].quantity > 1) {
      this.productos[index].quantity--;
    }
  }
}
