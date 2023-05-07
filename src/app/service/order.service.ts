import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private af: AngularFirestore) {}

  createOrder(order: Order) {
    return this.af.collection<Order>('orders').add(order);
  }

  readOrders(user_id : string){
    return this.af.collection<Order>('orders', ref => ref.where("user_id", "==", user_id)).snapshotChanges();
  }

  deleteOrders(doc_id: string){
    return this.af.collection<Order>('orders').doc(doc_id).delete();
  }
}
