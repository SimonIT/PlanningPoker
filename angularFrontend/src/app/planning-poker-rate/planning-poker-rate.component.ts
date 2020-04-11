import {Component, OnInit} from '@angular/core';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs/internal/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanningPokerService} from '../planning-poker.service';
import {UserService} from '../user.service';
import {RatingService} from '../rating.service';
import {Observable, timer} from 'rxjs';

@Component({
  selector: 'app-planning-poker-rate',
  templateUrl: './planning-poker-rate.component.html',
  styleUrls: ['./planning-poker-rate.component.css'],
  providers: [NgbPaginationConfig]
})
export class PlanningPokerRateComponent implements OnInit {
  planningpoker: any = {};
  currentUser: any = {};
  stories: Array<any> = [];
  cards: Array<any> = [];
  ratings: Array<any> = [];

  sub: Subscription;
  ratingsTimer: Observable<number>;
  showResult: boolean = false;
  page = 1;
  id;

  constructor(config: NgbPaginationConfig,
              private route: ActivatedRoute,
              private router: Router,
              private planningpokerService: PlanningPokerService,
              private userService: UserService,
              private ratingService: RatingService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
        }
      });
      this.planningpokerService.getStories(this.id).subscribe((stories: any) => {
        if (stories) {
          this.stories = stories._embedded.stories;
        } else {
          console.log(`Car with id '${this.id}' not found, returning to list`);
          this.gotoList();
        }
      });
      this.planningpokerService.getAvailableCards(this.id).subscribe((cards: any) => {
        this.cards = cards._embedded.cards;
      });
    });
  }

  onPager() {
    this.ratings = [];
    this.showResult = false;
  }

  gotoList() {
    this.router.navigate(['/planningpoker-list']);
  }

  rate(planningPoker: any, story: any, card: any) {
    if (story) {
      this.ratingService.hasRated(planningPoker, story, this.currentUser).subscribe((result: any) => {
        if (result) {
          this.ratingService.updateRating(result, card).subscribe(() => {
            this.showResult = true;
          });
        } else {
          this.ratingService.addRating(planningPoker, this.currentUser, story, card).subscribe(() => {
            this.showResult = true;
          });
        }
        this.ratingsTimer = timer(0, 1000);
        this.ratingsTimer.subscribe(() => {
          this.fetchRatings();
        });
      });
    }
  }

  fetchRatings() {
    if (this.showResult) {
      this.ratingService.getByPlanningPokerAndStory(this.planningpoker, this.stories[this.page - 1]).subscribe((ratings: Array<any>) => {
        if (ratings) {
          this.ratings = ratings;
        }
      });
    }
  }
}
