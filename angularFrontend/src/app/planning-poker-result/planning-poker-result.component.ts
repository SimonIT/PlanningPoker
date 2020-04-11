import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {PlanningPokerService} from '../planning-poker.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {RatingService} from '../rating.service';
import {Observable, timer} from 'rxjs';

@Component({
  selector: 'app-planning-poker-result',
  templateUrl: './planning-poker-result.component.html',
  styleUrls: ['./planning-poker-result.component.css']
})
export class PlanningPokerResultComponent implements OnInit {
  planningpoker: any = {};
  stories: Array<any> = [];
  allRatings: Array<Array<any>> = [[]];
  index: Array<number> = [];
  id;
  sub: Subscription;
  ratingsTimer: Observable<number>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private planningpokerService: PlanningPokerService,
              private userService: UserService,
              private ratingService: RatingService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.planningpokerService.getById(this.id).subscribe((planningpoker: any) => {
        if (planningpoker) {
          this.planningpoker = planningpoker;
        }
      });
      this.planningpokerService.getStories(this.id).subscribe((stories: any) => {
        if (stories) {
          this.stories = stories._embedded.stories;
        }
      });
      this.ratingsTimer = timer(0, 3000);
      this.ratingsTimer.subscribe(() => {
        this.fetchRatings();
      });
    });
  }

  gotoList() {
    this.router.navigate(['/planningpoker-list']);
  }

  fetchRatings() {
    this.allRatings.length = 0;
    this.index.length = 0;
    for (let i = 0; i < this.stories.length; i++) {
      this.index.push(i);
      this.ratingService.getByPlanningPokerAndStory(this.planningpoker, this.stories[i]).subscribe((ratings: Array<any>) => {
        if (ratings) {
          this.allRatings[i] = ratings;
        }
      });
    }
  }
}
