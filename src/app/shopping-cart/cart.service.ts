import { Injectable } from '@angular/core';
import { Item as CartItem } from './models/Item';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
private readonly cartList = new Subject<CartItem[]>();
latestCartlist = this.cartList.asObservable()
private storageKey = 'shoppingCart';

 CartItems:CartItem[] =[];
  constructor() {
    this.CartItems=[];


  }

  //Add Product to Cart
  addToCart(item: CartItem): void {
      this.CartItems.push(item);
      this.cartList.next(this.CartItems)
      alert("added item to cart");
  }

  //Get All Cart Items
  getCartItems(): any {
    this.CartItems;
    this.cartList.next(this.CartItems)
    return this.CartItems;
  }

  //Update Quantity
  updateQuantity(productId: number, quantity: number): void {

  }

  //Remove Product from Cart
  removeFromCart(index: number): void {
   this.CartItems= this.CartItems.splice(index, 1 );

  this.cartList.next(this.CartItems)
   alert("Card updated");
   console.log(this.CartItems);
  }

  //Clear Entire Cart
  clearCart(): void {

  }

  //Calculate Total Items
  getTotalItems(): number {
  return 45;
  }

  //Calculate Total Amount
  getTotalPrice(): number {
    return 12;
  }

  // Private helper
  private saveCart(cart: CartItem[]): void {
    //save data to sessionStorage
  }
}
