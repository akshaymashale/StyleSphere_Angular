import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order';
import { OrderDetails } from 'src/app/Models/OrderDetails';
import { Product } from 'src/app/Models/Product';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  userid: number;
  productDetails: Map<number, Product> = new Map();

  constructor(private _order: OrderService, private _product: ProductService) {}

  ngOnInit() {
    this.userid = parseInt(sessionStorage.getItem('userid') || '0', 10);
    this.fetchOrders();
  }

  // fetching order of user by userid
  fetchOrders(): void {
    this._order.getOrdersByUserId(this.userid).subscribe({
      next:(data : Order[]) => {
        this.orders = data;

        this.orders.forEach(order => this.fetchProductDetails(order.prodId));
      }
    })
  }

   // fetch order details using the orderid for user with userid
  fetchProductDetails(prodId:number):void{
    if(!this.productDetails.has(prodId)){
      this._product.getProductById(prodId).subscribe({
        next: (data: Product) => {
          this.productDetails.set(prodId,data);
        }
      })
    }
  }

  getProductDetails(prodId:number):Product | undefined {
    return this.productDetails.get(prodId);
  }

  cancelOrder(orderid:number):void{
    this._order.deleteOrder(orderid).subscribe({
      next:() => {
        this.orders = this.orders.filter(item => item.orderId !== orderid)
        alert("Order Cancelled !");
      },
      error: (error) => {
        alert('Error cancelling order');
        
      }
    })
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }
 
}
