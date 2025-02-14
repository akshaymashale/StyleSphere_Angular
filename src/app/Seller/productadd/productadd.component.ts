import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File;
  userid: number;
  categories = [
    { id: 1, name: 'T-shirt' },
    { id: 2, name: 'Casual Shirt' },
    { id: 3, name: 'Formal Shirt' },
    { id: 4, name: 'Jeans' },
    { id: 5, name: 'Trousers' },
    { id: 6, name: 'SportWear' }
  ];

  constructor(private fb: FormBuilder, private service: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      prodId: [0],
      prodName: ['', Validators.required],
      description: ['', Validators.required],
      imageFile: [null, Validators.required],
      availaibility: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock_Quantity: [0, [Validators.required, Validators.min(0)]]
    });
    this.userid = parseInt(sessionStorage.getItem('userid') || '0', 10);
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.productForm.patchValue({
        imageFile: this.selectedFile
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValues = this.productForm.value;
      const formData: FormData = new FormData();
      
      formData.append('prodId', formValues.prodId.toString());
      formData.append('prodName', formValues.prodName);
      formData.append('description', formValues.description);
      formData.append('imageFile', this.selectedFile);
      formData.append('availaibility', formValues.availaibility);
      formData.append('categoryId', formValues.categoryId);
      formData.append('userId', this.userid.toString());
      formData.append('price', formValues.price.toString());
      formData.append('stock_Quantity', formValues.stock_Quantity.toString());

      console.log('Product to be added:', formValues);

      this.service.AddProduct(formData).subscribe(
        response => {
          console.log('Product added successfully!', response);
          this.router.navigate(['myproducts']);
        },
        error => {
          console.error('Error adding product', error);
        }
      );
    } else {
      console.error('Form is invalid:', this.productForm.errors);
    }
  }
}
