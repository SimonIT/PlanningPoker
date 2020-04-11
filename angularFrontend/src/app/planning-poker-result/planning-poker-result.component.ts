import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {PlanningPokerService} from '../planning-poker.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-planning-poker-result',
  templateUrl: './planning-poker-result.component.html',
  styleUrls: ['./planning-poker-result.component.css']
})
export class PlanningPokerResultComponent implements OnInit {
  planningpoker: any = {};
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private planningpokerService: PlanningPokerService,) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.planningpokerService.getById(id).subscribe((planningpoker: any) => {
        if (planningpoker) {
          this.planningpoker = planningpoker;
          this.planningpoker.href = planningpoker._links.self.href;
        } else {
          console.log(`Car with id '${id}' not found, returning to list`);
          this.gotoList();
        }
      });
    });
  }

  gotoList() {
    this.router.navigate(['/planningpoker-list']);
  }

}
