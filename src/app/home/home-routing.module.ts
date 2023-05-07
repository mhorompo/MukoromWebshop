import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from '../guard/auth.guard';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [AuthGuard]},{path: 'cart', component: CartComponent, canActivate: [AuthGuard]}, {path: 'order', component: OrderComponent, canActivate: [AuthGuard]}, {path: "order-list", component: OrderListComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
