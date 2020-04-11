import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanningPokerEditComponent} from './planning-poker-edit.component';

describe('PlanningPokerEditComponent', () => {
  let component: PlanningPokerEditComponent;
  let fixture: ComponentFixture<PlanningPokerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningPokerEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPokerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
