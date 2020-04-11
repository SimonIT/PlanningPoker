import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  public API = '//' + window.location.hostname + ':8080/stories/';

  constructor(private http: HttpClient) {
  }

  addStory(description: string): Observable<any> {
    return this.http.post(this.API, {description: description});
  }
}
