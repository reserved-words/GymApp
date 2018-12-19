import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightMainComponent } from './main.component';

describe('WeightComponent', () => {
  let component: WeightMainComponent;
  let fixture: ComponentFixture<WeightMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
