import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemSmallCardComponent } from './book-item-small-card.component';

describe('BookItemSmallCardComponent', () => {
  let component: BookItemSmallCardComponent;
  let fixture: ComponentFixture<BookItemSmallCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemSmallCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
