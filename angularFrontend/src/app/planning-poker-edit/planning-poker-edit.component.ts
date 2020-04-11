import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanningPokerService} from '../planning-poker.service';
import {CardService} from '../card.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {UserService} from '../user.service';
import {StoryService} from '../story.service';

@Component({
  selector: 'app-planning-poker-edit',
  templateUrl: './planning-poker-edit.component.html',
  styleUrls: ['./planning-poker-edit.component.css']
})
export class PlanningPokerEditComponent implements OnInit, OnDestroy {
  id;
  planningpoker: any = {};
  availableCards: Array<any> = [];
  alreadyInvited: Array<any> = [];
  currentStories: Array<any> = [];
  allCards: Array<any>;
  allUsers: Array<any>;

  usersToInvite: Array<any> = [];
  usersToUninvite: Array<any> = [];
  newUser: any;
  newStoryDescription: string;
  storiesToAdd: Array<string> = [];
  storiesToRemove: Array<any> = [];
  newdate: string;
  newtime: string;

  sub: Subscription;
  userAPI = '//' + window.location.hostname + ':8080/users/';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private planningpokerService: PlanningPokerService,
              private cardService: CardService,
              private userService: UserService,
              private storyService: StoryService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.planningpokerService.getById(this.id).subscribe((planningpoker: any) => {
          if (planningpoker) {
            this.planningpoker = planningpoker;
            this.planningpoker.href = planningpoker._links.self.href;
            let dateSplit = planningpoker.date.split(/[TZ+]/); // Split the jsonformat date into parts for the two seperate inputs
            this.newdate = dateSplit[0];
            this.newtime = dateSplit[1];
            this.fetchCards();
          } else {
            console.log(`Car with id '${this.id}' not found, returning to list`);
            this.gotoList();
          }
        });
        this.planningpokerService.getAvailableCards(this.id).subscribe((availableCards: any) => {
          this.availableCards = availableCards._embedded.cards;
        });
        this.planningpokerService.getInvitedUsers(this.id).subscribe((invitedUsers: any) => {
          this.alreadyInvited = invitedUsers._embedded.users;
        });
        this.planningpokerService.getStories(this.id).subscribe((stories: any) => {
          this.currentStories = stories._embedded.stories;
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
      if (this.availableCards) {
        for (let i = 0; i < cards.length; i++) {
          cards[i].checked = this.availableCards.find(c => c.value == cards[i].value); // Check the card which are already checked
        }
      }
    });
  }

  /**
   * filters the users for the ngbTypeahead
   * @param {Observable<string>} text
   * @returns {Observable<any[]>}
   */
  searchUser = (text: Observable<string>) =>
    text.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.allUsers.filter(v => v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  /**
   * Displays only the real Name in the ngbTypeahead
   * @param value
   * @returns {string}
   */
  formatUsername = (value: any) => value.fullName || '';

  /**
   * if the user presses enter on the ngbTypeahead, add the users to invitations
   * @param event
   */
  userSelected(event: any) {
    event.preventDefault();
    this.usersToInvite.push(event.item);
    this.newUser = '';
  }

  /**
   * removes the user from thegoint to be invited
   * @param user
   */
  removeUser(user: any) {
    for (let i = 0; i < this.usersToInvite.length; i++) {
      if (user.guid == this.usersToInvite[i].guid) {
        this.usersToInvite.splice(i, 1);
        break;
      }
    }
  }

  /**
   * remove the invitation for the user
   * @param user
   */
  removeInvitedUser(user: any) {
    for (let i = 0; i < this.alreadyInvited.length; i++) {
      if (PlanningPokerService.getIdFromSpringObject(user) == PlanningPokerService.getIdFromSpringObject(this.alreadyInvited[i])) {
        this.usersToUninvite.push(this.alreadyInvited[i]);
        this.alreadyInvited.splice(i, 1);
        break;
      }
    }
  }

  addStory() {
    if (this.newStoryDescription) {
      this.storiesToAdd.push(this.newStoryDescription);
      this.newStoryDescription = '';
    }
  }

  removeStory(description: string) {
    for (let i = 0; i < this.storiesToAdd.length; i++) {
      if (description == this.storiesToAdd[i]) {
        this.storiesToAdd.splice(i, 1);
        break;
      }
    }
  }

  removeSavedStory(story: any) {
    for (let i = 0; i < this.currentStories.length; i++) {
      if (PlanningPokerService.getIdFromSpringObject(story) == PlanningPokerService.getIdFromSpringObject(this.currentStories[i])) {
        this.storiesToRemove.push(this.currentStories[i]);
        this.currentStories.splice(i, 1);
        break;
      }
    }
  }

  gotoList() {
    this.router.navigate(['/planningpoker-list']);
  }

  save() {
    if (this.newdate && this.newtime) {
      this.planningpoker.date = new Date(this.newdate + 'T' + this.newtime + 'Z').toJSON(); // add the inputs to a json date string
    } else {
      this.planningpoker.date = new Date().toJSON();
    }

    if (!this.planningpoker.owner) {
      this.planningpoker.owner = encodeURI(this.userAPI + JSON.parse(localStorage.getItem('currentUser')).guid); // Setting the logged in user as owner by referencing the object
    }

    this.planningpokerService.save(this.planningpoker).subscribe(result => {
      if (result) {
        // Saving all references to the different objects
        this.id = PlanningPokerService.getIdFromSpringObject(result);
        for (let i = 0; i < this.allCards.length; i++) {
          let isAvailable = false;
          for (let j = 0; j < this.availableCards.length; j++) {
            if (this.allCards[i].id == PlanningPokerService.getIdFromSpringObject(this.availableCards[j])) {
              isAvailable = true;
            }
          }
          if (isAvailable) {
            if (!this.allCards[i].checked) {
              this.planningpokerService.removeCard(this.id, this.allCards[i]).subscribe(value => {
              }, error1 => {
                console.error(error1);
              });
            }
          } else {
            if (this.allCards[i].checked) {
              this.planningpokerService.addCard(this.id, this.allCards[i]).subscribe(value => {
              }, error1 => {
                console.error(error1);
              });
            }
          }
        }

        for (let i = 0; i < this.usersToInvite.length; i++) {
          //TODO send email / push notification to all usersToInvite
          this.planningpokerService.addInvitation(this.id, this.usersToInvite[i]).subscribe((answer: any) => {
          }, error1 => {
            console.error(error1);
          });
        }
        this.usersToInvite = [];

        for (let i = 0; i < this.usersToUninvite.length; i++) {
          this.planningpokerService.removeInvitation(this.id, this.usersToUninvite[i]).subscribe((answer: any) => {
          }, error1 => {
            console.error(error1);
          });
        }
        this.usersToUninvite = [];

        this.addStory();
        for (let i = 0; i < this.storiesToAdd.length; i++) {
          this.storyService.addStory(this.storiesToAdd[i]).subscribe((story: any) => {
            this.planningpokerService.addStory(this.id, story).subscribe((answer: any) => {
            }, error2 => {
              console.error(error2);
            });
          }, error1 => {
            console.error(error1);
          });
        }
        this.storiesToAdd = [];

        for (let i = 0; i < this.storiesToRemove.length; i++) {
          this.planningpokerService.removeStory(this.id, this.storiesToRemove[i]).subscribe((answer: any) => {
          }, error1 => {
            console.error(error1);
          });
        }
        this.storiesToRemove = [];
        this.gotoList();
      }
    }, error => console.error(error));
  }

  remove(href) {
    this.planningpokerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
