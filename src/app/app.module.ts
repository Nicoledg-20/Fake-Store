import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './productlist/productlist.component';
import { FakeStoreService } from './services/fake-store.service';

// Define routes
const routes: Routes = [
  { path: '', component: ProductListComponent },
  // Add other routes here
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
    // Add other components here
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FakeStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
