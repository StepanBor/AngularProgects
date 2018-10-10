import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemMidleCardComponent } from './book-item-midle-card.component';

describe('BookItemMidleCardComponent', () => {
  let component: BookItemMidleCardComponent;
  let fixture: ComponentFixture<BookItemMidleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemMidleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemMidleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
