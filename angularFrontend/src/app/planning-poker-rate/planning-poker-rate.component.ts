import {Component, OnInit} from '@angular/core';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs/internal/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanningPokerService} from '../planning-poker.service';

@Component({
  selector: 'app-planning-poker-rate',
  templateUrl: './planning-poker-rate.component.html',
  styleUrls: ['./planning-poker-rate.component.css'],
  providers: [NgbPaginationConfig]
})
export class PlanningPokerRateComponent implements OnInit {
  planningpoker: any = {};
  sub: Subscription;
  page = 1;
  id;

  constructor(config: NgbPaginationConfig,
              private route: ActivatedRoute,
              private router: Router,
              private planningpokerService: PlanningPokerService,) {
    config.boundaryLinks = true;
    config.pageSize = 1;
    config.rotate = true;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.planningpokerService.getById(this.id).subscribe((planningpoker: any) => {
        if (planningpoker) {
          this.planningpoker = planningpoker;
          this.planningpoker.href = planningpoker._links.self.href;
        } else {
          console.log(`Car with id '${this.id}' not found, returning to list`);
          this.gotoList();
        }
      });
    });
  }

  gotoList() {
    this.router.navigate(['/planningpoker-list']);
  }

  rate(story: any, card: any) {
    //TODO rating
    if (this.page < this.planningpoker.stories.length) {
      this.page++;
    } else {
      this.router.navigate(['/planningpoker-result/' + this.id]);
    }
  }
}
