import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Product';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  sellerId: number;
  productDetails: Map<number, Product> = new Map();
  searchQuery: string = '';
  sortOption: string = '';
  
  statusOptions = [
    'Placed',
    'Confirmed',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  constructor(
    private _order: OrderService,
    private _product: ProductService
  ) {}

  ngOnInit() {
    this.sellerId = parseInt(sessionStorage.getItem('userid') || '0', 10);
    this.fetchOrders();
  }

  fetchOrders(): void {
    this._order.getOrdersBySellerId(this.sellerId).subscribe({
      next: (data: Order[]) => {
        this.orders = data;
        this.filteredOrders = [...this.orders];
        this.orders.forEach(order => this.fetchProductDetails(order.prodId));
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  // search orders with prodname and description
  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredOrders = [...this.orders];
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredOrders = this.orders.filter(order => {
        const product = this.getProductDetails(order.prodId);
        return (
          order.orderNumber.toString().includes(query) ||
          (product && product.prodName.toLowerCase().includes(query)) ||
          (product && product.description.toLowerCase().includes(query)) ||
          order.status.toLowerCase().includes(query)
        );
      });
    }
    if (this.sortOption) {
      this.sortOrders();
    }
  }

  // sort orders based on orderdate
  sortOrders(): void {
    switch (this.sortOption) {
      case 'Latest':
        this.filteredOrders.sort((a, b) => {
          const dateA = new Date(a.orderDate).getTime();
          const dateB = new Date(b.orderDate).getTime();
          return dateB - dateA; // Most recent first
        });
        break;
      case 'Oldest':
        this.filteredOrders.sort((a, b) => {
          const dateA = new Date(a.orderDate).getTime();
          const dateB = new Date(b.orderDate).getTime();
          return dateA - dateB; // Oldest first
        });
        break;
      
      default:
        this.filteredOrders = [...this.orders];
    }
  }

    // fetching product details present in orderlist
  fetchProductDetails(prodId: number): void {
    if (!this.productDetails.has(prodId)) {
      this._product.getProductById(prodId).subscribe({
        next: (data: Product) => {
          this.productDetails.set(prodId, data);
        },
        error: (error) => {
          console.error('Error fetching product details:', error);
        }
      });
    }
  }

    // to retrieve productdetails from map
  getProductDetails(prodId: number): Product | undefined {
    return this.productDetails.get(prodId);
  }

    
  updateOrderStatus(orderId: number, status: string): void {
    if (!status) return;
    this._order.getOrderById(orderId).subscribe({
      next: (order: Order) => {
        order.status = status;
        this._order.updateOrder(orderId, order).subscribe({
          next: () => {
            alert("Order status updated successfully !")
            this.fetchOrders();
          },
          error: (error) => {
            console.error('Error updating order:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }
}