import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPokerRateComponent } from './planning-poker-rate.component';

describe('PlanningPokerRateComponent', () => {
  let component: PlanningPokerRateComponent;
  let fixture: ComponentFixture<PlanningPokerRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningPokerRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPokerRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
