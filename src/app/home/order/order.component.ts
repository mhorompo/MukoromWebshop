import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { Order } from 'src/app/models/Order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  cartItem?: Cart[] = [];

  firstFormGroup: FormGroup = new FormGroup({
    veznev: new FormControl('', [Validators.required]),
    kernev: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
  });

  secondFormGroup: FormGroup = new FormGroup({
    irsz: new FormControl('', [Validators.required]),
    varos: new FormControl('', [Validators.required]),
    utca_hsz: new FormControl('', [Validators.required]),
  });

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.cartService.getCart(user.uid).subscribe((cartItem) => {
      this.cartItem = cartItem.map((item) => {
        const id = item.payload.doc.id;
        const data = item.payload.doc.data();
        return { id, ...data };
      });
    });
  }

  sendOrder() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const prod_ids = this.cartItem?.map((item) => item.product_id);
      const doc_id = this.cartItem?.map((item) => item.id);
      const order: Order = {
        user_id: user.uid,
        veznev: this.firstFormGroup.get('veznev')?.value,
        kernev: this.firstFormGroup.get('kernev')?.value,
        tel: this.firstFormGroup.get('tel')?.value,
        irsz: this.secondFormGroup.get('irsz')?.value,
        varos: this.secondFormGroup.get('varos')?.value,
        utca_hsz: this.secondFormGroup.get('utca_hsz')?.value,
        product: prod_ids as Array<string>,
      };
      this.orderService
        .createOrder(order)
        .then((_) => {
          console.log('Sikeres rendelés');
          doc_id?.map(i => {
            this.cartService.removeFromCart(i as string).then(_=>{
              this.router.navigate(["home"]);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
