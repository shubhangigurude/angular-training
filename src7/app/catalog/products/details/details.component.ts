import { Component,Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter/counter.component';
import { CartService } from '../../../shopping-cart/cart.service';
import { Item } from '../../../shopping-cart/models/Item';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CounterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  @Input() product: Product | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  onUpdate(data: any) {
    if (this.product != undefined)
      this.product.likes = data.count;
  }

  addToCart() {
    if (!this.product) return;
    const item = new Item(
      this.product.id,
      this.product.title,
      this.product.price,
      1,
      this.product.imageurl
    );
    this.cartService.addToCart(item);
  }
}
