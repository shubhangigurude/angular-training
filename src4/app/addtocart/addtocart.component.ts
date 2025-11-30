import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CartProduct } from '../cartIProduct';
import { CartService } from '../cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addtocart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addtocart.component.html',
  styleUrl: './addtocart.component.css'
})
export class AddtocartComponent {
  constructor(private cartService: CartService, private route: ActivatedRoute) {

  }

  @Input() carItem: CartProduct | undefined;
  currentProductId: string | undefined;

  ngOnInit() {
   // this.currentProductId = this.route.snapshot.paramMap.get("id");
    //this.carItem = this.cartService.getProductById(this.currentProductId);
  };

  addToCart(form: NgForm) {
    if (form.invalid) return;
    const newItem: CartProduct = form.value;

    // Check if item already exists → update quantity
    const existingItem = this.cartService.getCartItem(1);
    if (existingItem) {
      //this.cartService.updateQuantity(this.id, newItem.quantity)
    }
    else {
      this.cartService.addToCart(this.carItem!)
    }
    alert('Item added to cart!');
    form.resetForm();
  }
}
