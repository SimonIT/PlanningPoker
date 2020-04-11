import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPokerLoginComponent } from './planning-poker-login.component';

describe('PlanningPokerLoginComponent', () => {
  let component: PlanningPokerLoginComponent;
  let fixture: ComponentFixture<PlanningPokerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningPokerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPokerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
