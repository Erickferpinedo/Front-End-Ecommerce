import { Injectable, signal } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Producto; quantity: number }[] = [];
  isCartVisible = signal(false);

  // Get cart items
  getItems() {
    return this.cartItems;
  }

  addToCart(product: Producto, quantity: number = 1): void {
    const existing = this.cartItems.find((item) => item.product._id === product._id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
  }

  toggleCart() {
    this.isCartVisible.update((v) => !v);
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.precio * item.quantity, 0);
  }
}
