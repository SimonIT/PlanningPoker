import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanningPokerService} from '../planning-poker.service';
import {CardService} from '../card.service';
import {NgForm} from '@angular/forms';
import * as $ from 'jquery';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {UserService} from '../user.service';

@Component({
  selector: 'app-planning-poker-edit',
  templateUrl: './planning-poker-edit.component.html',
  styleUrls: ['./planning-poker-edit.component.css']
})
export class PlanningPokerEditComponent implements OnInit, OnDestroy {
  planningpoker: any = {invitedUsers: [], stories: []};
  allCards: Array<any>;
  allUsers: Array<any>;

  usersToInvite: Array<any> = [];
  newUser: any;
  newStoryDescription: string;
  newdate: string;
  newtime: string;

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private planningpokerService: PlanningPokerService,
              private cardService: CardService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.planningpokerService.getById(id).subscribe((planningpoker: any) => {
          if (planningpoker) {
            this.planningpoker = planningpoker;
            this.planningpoker.href = planningpoker._links.self.href;
            let dateSplit = planningpoker.date.split(/[TZ+]/);
            this.newdate = dateSplit[0];
            this.newtime = dateSplit[1];
            this.fetchCards();
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      } else {
        this.fetchCards();
      }
    });
    this.userService.getAll().subscribe((users: any) => {
      this.allUsers = users;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchCards() {
    this.cardService.getAll().subscribe((cards: any) => {
      this.allCards = cards;
      if (this.planningpoker.availableCards) {
        for (let i = 0; i < cards.length; i++) {
          cards[i].checked = this.planningpoker.availableCards.find(c => c.value == cards[i].value);
        }
      }
    });
  }

  searchUser = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.allUsers.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatUsername = (value: any) => value.name || '';

  userSelected(event: any) {
    event.preventDefault();
    this.usersToInvite.push(event.item);
    this.newUser = '';
  }

  removeUser(id: string) {
    for (let i = 0; i < this.usersToInvite.length; i++) {
      if (id == this.usersToInvite[i].id) {
        this.usersToInvite.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < this.planningpoker.invitedUsers.length; i++) {
      if (id == this.planningpoker.invitedUsers[i].id) {
        this.planningpoker.invitedUsers.splice(i, 1);
        break;
      }
    }
  }

  addStory() {
    if (this.newStoryDescription) {
      this.planningpoker.stories.push({description: this.newStoryDescription});
      this.newStoryDescription = '';
    }
  }

  removeStory(id: string) {
    for (let i = 0; i < this.planningpoker.stories.length; i++) {
      if (id == this.planningpoker.stories[i].id) {
        this.planningpoker.stories.splice(i, 1);
        break;
      }
    }
  }

  gotoList() {
    this.router.navigate(['/planningpoker-list']);
  }

  save(form: NgForm) {
    if (this.newdate && this.newtime) {
      this.planningpoker.date = new Date(this.newdate + 'T' + this.newtime + 'Z').toJSON();
    } else {
      this.planningpoker.date = new Date().toJSON();
    }
    this.planningpoker.availableCards = this.allCards.filter(c => c.checked);

    //TODO send email / push notification to all usersToInvite

    if (!this.planningpoker.invitedUsers) {
      this.planningpoker.invitedUsers = [];
    }
    this.planningpoker.invitedUsers = this.planningpoker.invitedUsers.concat(this.usersToInvite);
    this.usersToInvite = [];

    this.planningpokerService.save(this.planningpoker).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.planningpokerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
