import {Component, OnInit} from '@angular/core';
import {PlanningPokerService} from '../planning-poker.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planning-poker-list',
  templateUrl: './planning-poker-list.component.html',
  styleUrls: ['./planning-poker-list.component.css']
})
export class PlanningPokerListComponent implements OnInit {
  currentUser: any = {};
  ownPlanningpokers: Array<any>;
  joinedPlanningpokers: Array<any>;
  invitedPlanningpokers: Array<any>;
  searchedPlanningpoker: any = {};
  invitedPlanningpoker: any = {};

  constructor(private modalService: NgbModal,
              private planningpokerService: PlanningPokerService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.planningpokerService.getByOwner(this.currentUser).subscribe(planningpokers => {
      this.ownPlanningpokers = planningpokers;
    });
    this.planningpokerService.getJoined(this.currentUser).subscribe(planningpokers => {
      this.joinedPlanningpokers = planningpokers;
    });
    this.planningpokerService.getInvited(this.currentUser).subscribe(planningpokers => {
      this.invitedPlanningpokers = planningpokers;
    });
  }

  searchPlanningPoker(id: string, searchResult: any) {
    if (id) {
      this.planningpokerService.getById(id).subscribe((planningpoker: any) => {
          if (planningpoker) {
            this.searchedPlanningpoker = planningpoker;
            this.searchedPlanningpoker.id = id;
            this.modalService.open(searchResult);
            this.planningpokerService.getOwner(id).subscribe((owner: any) => {
              this.searchedPlanningpoker.owner = owner;
            });
            this.planningpokerService.getInvitedUsers(id).subscribe((invitedUsers: any) => {
              this.searchedPlanningpoker.invitedUsers = invitedUsers._embedded.users;
            });
            this.planningpokerService.getJoinedUsers(id).subscribe((joinedUsers: any) => {
              this.searchedPlanningpoker.joinedUsers = joinedUsers._embedded.users;
            });
          } else {
            //TODO show alert not found
          }
        },
        error => {
          if (error.status == 404) {
            //TODO show alert not found
          }
        });
    }
  }

  showInvitation(planningpoker: any, invitation: any) {
    if (planningpoker) {
      this.invitedPlanningpoker = planningpoker;
      this.planningpokerService.getOwner(this.invitedPlanningpoker.id).subscribe((owner: any) => {
        this.invitedPlanningpoker.owner = owner;
      });
      this.planningpokerService.getInvitedUsers(this.invitedPlanningpoker.id).subscribe((invitedUsers: any) => {
        this.invitedPlanningpoker.invitedUsers = invitedUsers._embedded.users;
      });
      this.planningpokerService.getJoinedUsers(this.invitedPlanningpoker.id).subscribe((joinedUsers: any) => {
        this.invitedPlanningpoker.joinedUsers = joinedUsers._embedded.users;
      });
      this.modalService.open(invitation).result.then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(`Dismissed`);
      });
    }
  }

  rejectInvitation(planningpoker: any) {
    this.planningpokerService.removeInvitation(planningpoker.id, this.currentUser).subscribe(value => {
    }, error1 => {
    });
    this.invitedPlanningpokers.filter(p => p.id != planningpoker.id);
  }

  joinPlanningpoker(planningpoker: any) {
    if (planningpoker.id) {
      if (PlanningPokerService.getIdFromSpringObject(planningpoker.owner) != this.currentUser.guid) {
        if (planningpoker.joinedUsers.filter(u => PlanningPokerService.getIdFromSpringObject(u) == this.currentUser.guid).length < 1) {
          let userIndex = planningpoker.invitedUsers.findIndex(u => PlanningPokerService.getIdFromSpringObject(u) == this.currentUser.guid);
          if (userIndex > -1) {
            // TODO notify owner
            this.planningpokerService.join(planningpoker.id, this.currentUser).subscribe();
            this.joinedPlanningpokers.push(planningpoker);
            this.planningpokerService.removeInvitation(planningpoker.id, this.currentUser).subscribe();
            this.invitedPlanningpokers = this.invitedPlanningpokers.filter(p => p.guid == planningpoker.id);
          } else {
            if (planningpoker.allowNotInvitedUser) {
              // TODO notify owner
              this.planningpokerService.join(planningpoker.id, this.currentUser).subscribe();
              this.joinedPlanningpokers.push(planningpoker);
            } else {
              // TODO show alert
            }
          }
        } else {
          //TODO show alert: you already joined the planning poker
        }
      } else {
        // TODO show alert: you are already the owner
      }
    }
  }
}
