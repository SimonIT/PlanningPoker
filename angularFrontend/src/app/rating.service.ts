import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {PlanningPokerService} from './planning-poker.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  public API = '//' + window.location.hostname + ':8080/ratings/';
  public MANAGER = '//' + window.location.hostname + ':8080/ratingManager/';

  constructor(private http: HttpClient) {
  }

  addRating(planningPoker: any, owner: any, story: any, card: any): Observable<any> {
    return this.http.post(this.API, {
      planningPoker: planningPoker._links.self.href,
      owner: '//' + window.location.hostname + '/users/' + owner.guid,
      story: story._links.self.href,
      card: card._links.self.href
    });
  }

  updateRating(rating: any, card: any): Observable<any> {
    return this.http.put(this.API + rating.id + '/card', '//' + window.location.hostname + ':8080/cards/' + PlanningPokerService.getIdFromSpringObject(card), {headers: PlanningPokerService.uriHeaders});
  }

  hasRated(planningPoker: any, story: any, user: any): Observable<any> {
    let params = new HttpParams()
      .append('planningPokerId', PlanningPokerService.getIdFromSpringObject(planningPoker))
      .append('storyId', PlanningPokerService.getIdFromSpringObject(story))
      .append('userGuid', user.guid);
    return this.http.post(this.MANAGER + 'hasRated/', '', {params: params});

  }

  getByPlanningPokerAndStory(planningPoker: any, story: any): Observable<any> {
    let params = new HttpParams().append('planningPokerId', PlanningPokerService.getIdFromSpringObject(planningPoker)).append('storyId', PlanningPokerService.getIdFromSpringObject(story));
    return this.http.post(this.MANAGER + 'getByPlanningPokerAndStory/', '', {params: params});
  }

  getStory(RatingId: string): Observable<any> {
    return this.http.get(this.API + RatingId + '/story');
  }

  getCard(RatingId: string): Observable<any> {
    return this.http.get(this.API + RatingId + '/card');
  }
}
