import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class PlanningPokerService {
  public API = '//' + window.location.hostname + ':8080/planningPokers/';
  public MANAGER = '//' + window.location.hostname + ':8080/planningpokers/';

  public static uriHeaders = new HttpHeaders().append('Content-Type', 'text/uri-list');

  constructor(private http: HttpClient) {
  }

  getByOwner(user: any): Observable<any> {
    return this.http.post(this.MANAGER + 'getByOwner', user);
  }

  getJoined(user: any): Observable<any> {
    return this.http.post(this.MANAGER + 'getJoined', user);
  }

  getInvited(user: any): Observable<any> {
    return this.http.post(this.MANAGER + 'getInvited', user);
  }

  getAvailableCards(id: string): Observable<any> {
    return this.http.get(this.API + id + '/availableCards');
  }

  getInvitedUsers(id: string): Observable<any> {
    return this.http.get(this.API + id + '/invitedUsers');
  }

  getJoinedUsers(id: string): Observable<any> {
    return this.http.get(this.API + id + '/joinedUsers');
  }

  getOwner(id: string): Observable<any> {
    return this.http.get(this.API + id + '/owner');
  }

  getStories(id: string): Observable<any> {
    return this.http.get(this.API + id + '/stories');
  }

  addInvitation(id: string, user: any): Observable<any> {
    return this.http.post(this.API + id + '/invitedUsers/', '//' + window.location.hostname + ':8080/users/' + user.guid, {headers: PlanningPokerService.uriHeaders});
  }

  join(id: string, user: any): Observable<any> {
    return this.http.post(this.API + id + '/joinedUsers/', '//' + window.location.hostname + ':8080/users/' + user.guid, {headers: PlanningPokerService.uriHeaders});
  }

  removeInvitation(id: string, user: any): Observable<any> {
    if (user._links) {
      return this.http.delete(this.API + id + '/invitedUsers/' + PlanningPokerService.getIdFromSpringObject(user), {headers: PlanningPokerService.uriHeaders});
    } else {
      return this.http.delete(this.API + id + '/invitedUsers/' + user.guid, {headers: PlanningPokerService.uriHeaders});
    }
  }

  addStory(id: string, story: any): Observable<any> {
    return this.http.post(this.API + id + '/stories/', '//' + window.location.hostname + ':8080/story/' + PlanningPokerService.getIdFromSpringObject(story), {headers: PlanningPokerService.uriHeaders});
  }

  removeStory(id: string, story: any): Observable<any> {
    return this.http.delete(this.API + id + '/stories/' + PlanningPokerService.getIdFromSpringObject(story), {headers: PlanningPokerService.uriHeaders});
  }

  addCard(id: string, card: any): Observable<any> {
    return this.http.post(this.API + id + '/availableCards/', '//' + window.location.hostname + ':8080/users/' + card.id, {headers: PlanningPokerService.uriHeaders});
  }

  removeCard(id: string, card: any): Observable<any> {
    return this.http.delete(this.API + id + '/availableCards/' + card.id, {headers: PlanningPokerService.uriHeaders});
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.API + id);
  }

  save(planningpoker: any): Observable<any> {
    let result: Observable<Object>;
    if (planningpoker['href']) {
      result = this.http.put(planningpoker.href, planningpoker);
    } else {
      result = this.http.post(this.API, planningpoker);
    }
    return result;
  }

  remove(href: string): Observable<any> {
    return this.http.delete(href);
  }

  public static getIdFromSpringObject(object: any) {
    let pieces = object._links.self.href.split('/');
    return pieces[pieces.length - 1];
  }
}
