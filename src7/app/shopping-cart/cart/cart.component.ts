import { Component } from '@angular/core';
import { Item as CartItem } from '../models/Item';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(id: number) { 
     this.cartService.removeFromCart(id);
    this.loadCart();}

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
  getTotalItems() {
    return this.cartService.getTotalItems();
  }
}