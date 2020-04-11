import {Component, OnInit} from '@angular/core';
import {PlanningPokerService} from '../planning-poker.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planning-poker-list',
  templateUrl: './planning-poker-list.component.html',
  styleUrls: ['./planning-poker-list.component.css']
})
export class PlanningPokerListComponent implements OnInit {
  planningpokers: Array<any>;
  searchedPlanningpoker: any = {};

  constructor(private modalService: NgbModal,
              private planningpokerService: PlanningPokerService) {
  }

  ngOnInit() {
    this.planningpokerService.getAll().subscribe(planningpokers => {
      this.planningpokers = planningpokers;
    });
  }

  searchPlanningPoker(id: string, searchResult: any) {
    this.planningpokerService.getById(id).subscribe((planningpoker: any) => {
      if (planningpoker) {
        this.searchedPlanningpoker = planningpoker;
        this.modalService.open(searchResult).result.then((result) => {
          console.log(`Closed with: ${result}`);
        }, (reason) => {
          console.log(`Dismissed`);
        });
      } else {
        console.log(`Car with id '${id}' not found`);
      }
    });
  }

  joinPlanningpoker(planningpoker: any) {

  }
}
