import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  public API = 'http://localhost:8080/ratings';

  constructor(private http: HttpClient) {
  }

  addRating(story: any, card: any): Observable<any> {
    return this.http.post(this.API, {
      story: story._links.self.href,
      card: card._links.self.href
    });
  }
}
