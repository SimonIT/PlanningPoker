import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanningPokerListComponent} from './planning-poker-list.component';

describe('PlanningPokerListComponent', () => {
  let component: PlanningPokerListComponent;
  let fixture: ComponentFixture<PlanningPokerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningPokerListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPokerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
