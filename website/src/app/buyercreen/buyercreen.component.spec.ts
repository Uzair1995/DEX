import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyercreenComponent } from './buyercreen.component';

describe('BuyercreenComponent', () => {
  let component: BuyercreenComponent;
  let fixture: ComponentFixture<BuyercreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyercreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyercreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
