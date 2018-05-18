import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitratorComponent } from './arbitrator.component';

describe('ArbitratorComponent', () => {
  let component: ArbitratorComponent;
  let fixture: ComponentFixture<ArbitratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbitratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
