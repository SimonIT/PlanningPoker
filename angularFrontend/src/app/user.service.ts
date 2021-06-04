import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API = '//' + window.location.hostname + ':8080/users/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('//' + window.location.hostname + ':8080/userManager/getAll');
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get('//' + window.location.hostname + ':8080/userManager/getByUsername?username=' + username);
  }
}
