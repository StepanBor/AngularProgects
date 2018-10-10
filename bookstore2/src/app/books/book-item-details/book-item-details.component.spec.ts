import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemDetailsComponent } from './book-item-details.component';

describe('BookItemDetailsComponent', () => {
  let component: BookItemDetailsComponent;
  let fixture: ComponentFixture<BookItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
