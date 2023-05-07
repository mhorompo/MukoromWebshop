import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Cart } from 'src/app/models/Cart';
import { CartService } from '../../service/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  productsInCart: Cart[] = [];
  displayedColumns: string[] = [
    'kep',
    'product_name',
    'quantity',
    'ar',
    'muveletek',
  ];
  dataSource?: any;
  @ViewChild(MatTable) table?: MatTable<any>;
  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.fetchCartItem();
  }

  getTotalCost() {
    return this.productsInCart
      .map((t) => t.ar * t.quantity)
      .reduce((acc, value) => acc + value, 0);
  }

  fetchCartItem() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.productsInCart = [];
    this.cartService.getCart(user.uid).subscribe((cartItem) => {
      this.productsInCart = cartItem.map((item) => {
        const id = item.payload.doc.id;
        const data = item.payload.doc.data();
        return { id, ...data };
      });
    });
  }

  onDelete(product: any) {
    console.log(product);
    this.cartService
      .removeFromCart(product.id)
      .then((_) => {
        console.log('Sikeres törlés');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onInputChange(value: string, prod: Cart){
    console.log(value, prod);
    this.cartService.updateProductQuantity(prod.id as string, Number(value), true);

  }
}
