import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorscreenComponent } from './arbitratorscreen.component';

describe('ArbitratorscreenComponent', () => {
  let component: ArbitratorscreenComponent;
  let fixture: ComponentFixture<ArbitratorscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbitratorscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitratorscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
