import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './productlist.component'; // Correct import

describe('ProductListComponent', () => { // Correct name
  let component: ProductListComponent; // Correct type
  let fixture: ComponentFixture<ProductListComponent>; // Correct type

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent] // Correct component name
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent); // Correct component name
    component = fixture.componentInstance; // Correct type
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
