import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Producto; quantity: number }[] = [];

  addToCart(product: Producto, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    console.log('Product added to cart:', this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}
