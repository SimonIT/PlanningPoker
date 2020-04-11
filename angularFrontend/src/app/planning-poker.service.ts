import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class PlanningPokerService {
  public API = '//localhost:8080/planningPokers/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/planningpokers/getAll');
  }

  getById(id: string) {
    return this.http.get(this.API + id);
  }

  save(planningpoker: any): Observable<any> {
    let result: Observable<Object>;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    if (planningpoker['href']) {
      result = this.http.put(planningpoker.href, planningpoker, httpOptions);
    } else {
      result = this.http.post(this.API, planningpoker, httpOptions);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
