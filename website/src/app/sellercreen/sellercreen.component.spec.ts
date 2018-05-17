import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellercreenComponent } from './sellercreen.component';

describe('SellercreenComponent', () => {
  let component: SellercreenComponent;
  let fixture: ComponentFixture<SellercreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellercreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellercreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
