import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPokerResultComponent } from './planning-poker-result.component';

describe('PlanningPokerResultComponent', () => {
  let component: PlanningPokerResultComponent;
  let fixture: ComponentFixture<PlanningPokerResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningPokerResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPokerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
