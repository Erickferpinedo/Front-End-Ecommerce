import { computed, Injectable, signal } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Producto; quantity: number }[] = [];
  productos = signal(new Map());
  cartVisibility = signal(false);

  //visualizacion de carrito (codigo copiado)
  total = computed(() => {
    const productsMap = this.productos();
    let total = 0;

    productsMap.forEach((product) => {
      total += product.price * product.quantity;
    });

    return total;
  });
  //****************************
  
  toggleCartVisibility() {
    this.cartVisibility.update((value) => !value);
  }

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
  incrementQuantity(productId: string) {
    this.productos.update((productosMap) => {
      const productInCart = productosMap.get(productId);

      if (productInCart) {
        productosMap.set(productId, {
          ...productInCart,
          quantity: productInCart.quantity + 1,
        });
      }

      return new Map(productosMap);
    });
  }

  decrementQuantity(productId: string) {
    this.productos.update((productosMap) => {
      const productInCart = productosMap.get(productId);
      if (productInCart!.quantity === 1) {
        productosMap.delete(productId);
      } else {
        productosMap.set(productId, {
          ...productInCart!,
          quantity: productInCart!.quantity - 1,
        });
      }

      return new Map(productosMap);
    });
  }

  deleteProduct(productId: string) {
    this.productos.update((productosMap) => {
      productosMap.delete(productId);
      return new Map(productosMap);
    });
  }
}
