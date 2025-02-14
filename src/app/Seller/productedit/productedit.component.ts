import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {
  product: Product = new Product();  // Initialize product
  prodId: number;
  userid: number;
  selectedFile: File | null = null;
  updatedForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductService, private activeRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.prodId = parseInt(this.activeRoute.snapshot.paramMap.get('prodid') || '0', 10);
    console.log("Product ID = " + this.prodId);

    this.service.getProductById(this.prodId).subscribe(data => {
      this.product = data;
      console.log(this.product);

      // Initialize the form group with the fetched product data
      this.updatedForm = this.fb.group({
        prodId: [this.product.prodId],
        prodName: [this.product.prodName],
        description: [this.product.description],
        imageFile: [this.product.image],
        availaibility: [this.product.availaibility],
        categoryId: [this.product.categoryId],
        price: [this.product.price],
        stock_Quantity: [this.product.stock_Quantity]
      });
    }, error => {
      console.error('Error fetching product:', error);
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.updatedForm.patchValue({
        imageFile: this.selectedFile
      });
    }
  }

  onSubmit() {
    if (!this.updatedForm) {
      console.error('Form is not initialized');
      return;
    }

    const formValues = this.updatedForm.value;
    const formData = new FormData();
    formData.append('prodId', formValues.prodId.toString());
    formData.append('prodName', formValues.prodName);
    formData.append('description', formValues.description);
    formData.append('imageFile', formValues.imageFile);
    formData.append('availaibility', formValues.availaibility.toString());
    formData.append('price', formValues.price.toString());
    formData.append('stock_Quantity', formValues.stock_Quantity.toString());

    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
    }
    console.log("Updated Product Form", this.updatedForm);

    this.service.UpdateProduct(this.prodId, formData).subscribe(data => {
      this.userid = parseInt(sessionStorage.getItem('userid') || '0', 10)
      alert("Product data updated!");
      this.route.navigate(['myproducts', this.userid]);
    }, error => {
      alert('Error updating product: ' + error.errorMessage);
      console.error('Error updating product:', error);
    });
  }
}
