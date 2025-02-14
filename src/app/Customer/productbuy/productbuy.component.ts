import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/Models/Order';
import { Payment } from 'src/app/Models/Payment';
import { Product } from 'src/app/Models/Product';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
import { ShippingService } from 'src/app/Services/shipping.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { CartService } from 'src/app/Services/cart.service';
import { Cart } from 'src/app/Models/Cart';
import { Shipping_Details } from 'src/app/Models/Shpping_Details';
import { ImageService } from 'src/app/Services/image.service';

declare var paypal: any; // Declare the paypal variable

@Component({
  selector: 'app-productbuy',
  templateUrl: './productbuy.component.html',
  styleUrls: ['./productbuy.component.css']
})
export class ProductbuyComponent implements OnInit {
  product: Product;
  prodid: number;
  userid: number;
  orderid: number;
  cart: Cart;
  shippingDetails: Shipping_Details = new Shipping_Details();
  payment: Payment = new Payment();
  orders: Order = new Order();

  constructor(
    private _product: ProductService,
    private _order: OrderService,
    private _shipping: ShippingService,
    private _payment: PaymentService,
    private _cart: CartService,
    private router: Router,
    private _image : ImageService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.prodid = parseInt(this.activateRoute.snapshot.paramMap.get('prodid') || '0', 10);
    this.userid = parseInt(sessionStorage.getItem('userid') || '0', 10);
    console.log(this.prodid);

    // Get Product Details
    this._product.getProductById(this.prodid).subscribe(data => {
      this.product = data;
      console.log(this.product);
    });
    
    this.initializePaymentDetails(); // Payment Details from either cart or product list

    this.shippingDetails.userId = this.userid;
    this.orders.userId = this.userid;
  }
  getImageUrl(imageName: string): string {
    return this._image.getImageUrl(imageName);
  }
  initializePaymentDetails() {
    // Search if product is in wishlist/cart
    this._cart.ProductInWishList(this.prodid, this.userid).subscribe(existingItem => {
      if (existingItem) {
        this._cart.getCartByProdId(this.prodid, this.userid).subscribe(data => {
          this.cart = data;
          this.payment = this.createPayment(this.cart.cart_Amount);
          console.log(this.payment);
        });
      } else {
        this.payment = this.createPayment(this.product.price);
        console.log(this.payment);
      }
    });
  }

  createPayment(amount: number): Payment {
    return {
      paymentId: 0,
      orderId: this.orderid,
      total_Amount: amount,
      shipping_Amount: 50,
      discount_Amount: 0,
      pay_Amount:amount + 50,
      payment_Status: 'paid',
      payment_Method: 'UPI',
      prodId: this.product.prodId
    };
  }

  calculateDeliveryDate(): string {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    return deliveryDate.toISOString().split('T')[0];
  }

  
  orderNow() {
    this.order().then(() => this.pay()).then(() => this.ship());
  }

  pay(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._payment.makePayment(this.payment).subscribe(
        paymentResponse => {
          console.log('Payment successful', paymentResponse);
          resolve();
        },
        paymentError => {
          console.error('Payment error:', paymentError);
          alert('Payment failed. Please try again.');
          reject(paymentError);
        }
      );
    });
  }

  order(): Promise<void> {
    return new Promise((resolve, reject) => {
      const order: Order = {
        orderId: 0,
        orderNumber: (1000 + Math.random() * 900000).toString(),
        orderDate: new Date().toISOString().split('T')[0],
        delieveryDate: this.calculateDeliveryDate(),
        total_Amount: this.payment.total_Amount,
        shipping_Amount: 50,
        discount_Amount: 0,
        net_Amount: this.payment.pay_Amount,
        status: 'confirmed',
        return_Reason: '',
        prodId: this.prodid,
        userId: this.orders.userId,
        sellerId: this.product.userId
      };

      this._order.addOrder(order).subscribe(
        data => {
          console.log('Order placed successfully:', data);
          alert("Order Placed Successfully !");
          this.product.stock_Quantity = this.product.stock_Quantity - this.cart.quantity;
          this._product.UpdateProduct(this.prodid,this.product);
          this.orderid = data.orderId;
          this.payment.orderId = data.orderId;
          this.shippingDetails.orderId = data.orderId;
          resolve();
        },
        orderError => {
          console.error('Error placing order:', orderError);
          alert('Failed to place order. Please try again.');
          reject(orderError);
        }
      );
    });
  }

  ship(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.shippingDetails.shippingId = 0;
      this.shippingDetails.prodId = this.prodid;

      this._shipping.addShippingDetails(this.shippingDetails).subscribe(
        response => {
          console.log('Shipping details added successfully:', response);
          this.router.navigate(['/orders',this.userid]);
          resolve();
        },
        error => {
          console.error('Error adding shipping details:', error);
          alert('Failed to add shipping details. Please try again.');
          reject(error);
        }
      );
    });
  }
}
