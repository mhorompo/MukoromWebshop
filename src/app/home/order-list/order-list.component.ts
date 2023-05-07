import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders: Order[] = [];

  displayedColumns: string[] = [
    'veznev',
    'kernev',
    'tel',
    'irsz',
    'varos',
    'utca_hsz',
    'termekek_count',
    'muveletek'
  ];
  dataSource?: any;
  constructor(private orderService: OrderService){}

  ngOnInit(){
    const user = JSON.parse(localStorage.getItem("user") as string);
    this.orderService.readOrders(user.uid).subscribe(order => {
      this.orders = order.map(o => {
        const id = o.payload.doc.id;
        const data = o.payload.doc.data();
        return {id, ...data};
      })
    });
    this.dataSource = this.orders;
  }

  onDelete(element: Order){
    this.orderService.deleteOrders(element.id as string).then(_=>{
      console.log("sikeres törlés");
    }).catch(err => {
      console.log(err);
    });
  }
}
