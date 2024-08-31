import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FakeStoreService } from '../services/fake-store.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  isFormVisible: boolean = false;
  currentProduct: Product | null = null;  // For holding the product being edited

  constructor(private fakeStoreService: FakeStoreService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.fakeStoreService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      this.fakeStoreService.addProduct(this.productForm.value).subscribe((newProduct) => {
        this.products.push(newProduct);
        this.productForm.reset();
        this.isFormVisible = false;
        this.currentProduct = null;  // Clear current product
      });
    }
  }

  deleteProduct(productId: number | undefined): void {
    if (productId !== undefined) {
      this.fakeStoreService.deleteProduct(productId).subscribe(() => {
        this.products = this.products.filter(product => product.id !== productId);
      });
    } else {
      console.error('Product ID is undefined');
    }
  }

  editProduct(product: Product): void {
    this.currentProduct = product;
    this.productForm.setValue({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    });
    this.isFormVisible = true;  // Show form for updating
  }

  updateProduct(): void {
    if (this.productForm.valid && this.currentProduct) {
      const updatedProduct = { ...this.currentProduct, ...this.productForm.value };
      this.fakeStoreService.updateProduct(updatedProduct.id!, updatedProduct).subscribe((response) => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = response;
        }
        this.productForm.reset();
        this.isFormVisible = false;
        this.currentProduct = null;  // Clear current product
      });
    }
  }

  loadLimitedProducts(limit: number): void {
    this.fakeStoreService.getLimitedProducts(limit).subscribe((data) => {
      this.products = data;
    });
  }

  loadSortedProducts(key: string, order: string): void {
    this.fakeStoreService.getSortedProducts(key, order).subscribe((data) => {
      this.products = data;
    });
  }

  loadProductsByCategory(category: string): void {
    this.fakeStoreService.getProductsByCategory(category).subscribe((data) => {
      this.products = data;
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}

// Define the Product interface directly in the component file
interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
