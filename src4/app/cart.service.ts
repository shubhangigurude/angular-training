import { Injectable } from '@angular/core';
import { CartProduct as CartItem } from './cartIProduct';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'shoppingCart';

  constructor() {
    // Initialize sessionStorage with demo data if empty
    if (!sessionStorage.getItem(this.storageKey)) {

    }
  }
  getCartItem(id: number): CartItem | undefined {
    const cartItems = this.getCartItems();
    return cartItems.find(item => item.id === id);
  }

  //Add Product to Cart
  addToCart(item: CartItem): void {
    let cartItems = this.getCartItems();
    cartItems.push(item);
    this.saveCart(cartItems);

  }

  //Get All Cart Items
  getCartItems(): CartItem[] {
    return this.getCartItems();
  }

  //Update Quantity
  updateQuantity(productId: number, quantity: number): void {
    let carItems = this.getCartItems();
    const item = carItems.find((x: any) => x.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart(carItems);
    }
  }

  //Remove Product from Cart
  removeFromCart(productId: number): void {
    let cartItems = this.getCartItems();
    const updatedCart = cartItems.filter((x: any) => x.productId !== productId);
    this.saveCart(updatedCart);
  }

  //Clear Entire Cart
  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  //Calculate Total Items
  getTotalItems(): number {
    var cartItems = this.getCartItems();
    return cartItems.length;
  }

  //Calculate Total Amount
  getTotalPrice(): number {
    return this.getCartItems().reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );
  }

  // Private helper
  private saveCart(cart: CartItem[]): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(cart));
  }
  private getCart(): CartItem[] {
    const cartItems = sessionStorage.getItem(this.storageKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }
}