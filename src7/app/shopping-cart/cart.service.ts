import { Injectable } from '@angular/core';
import { Item as CartItem } from './models/Item';
@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartDetails: CartItem[] = [
    { "productId": 1, "title": "Lotus-", "price": 24, "quantity": 2, "imageUrl": "assets/images/lotus.jpg" },
    { "productId": 2, "title": "Rose-", "price": 14, "quantity": 3, "imageUrl": "assets/images/rose.jpg" },
    { "productId": 3, "title": "Jasmine-", "price": 3, "quantity": 5, "imageUrl": "assets/images/jasmine.jpg" },
  ];

  private storageKey = 'shoppingCart';

  constructor() {
    // Initialize sessionStorage with demo data if empty
    //if (!sessionStorage.getItem(this.storageKey)) {
  }

  //Add Product to Cart
  addToCart(item: CartItem): void {
    const existing = this.cartDetails.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartDetails.push(item);
    }
    this.saveCart(this.cartDetails);
  }

  //Get All Cart Items
  getCartItems(): CartItem[] {
    return this.cartDetails;
  }

  //Update Quantity
  updateQuantity(productId: number, quantity: number): void {

  }

  //Remove Product from Cart
  removeFromCart(productId: number): void {
    this.cartDetails = this.cartDetails.filter(item => item.productId !== productId);
    this.saveCart(this.cartDetails);
  }

  //Clear Entire Cart
  clearCart(): void {
    this.cartDetails = [];
    this.saveCart(this.cartDetails);
  }

  //Calculate Total Items
  getTotalItems(): number {    
    return this.cartDetails.reduce((sum, it) => sum + (it.quantity || 0), 0);
  }

  //Calculate Total Amount
  getTotalPrice(): number {    
    return this.cartDetails.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
  }

  // Private helper
  private saveCart(cart: CartItem[]): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(cart));
  }
}
