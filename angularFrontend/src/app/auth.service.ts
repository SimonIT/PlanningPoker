import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = '//' + window.location.hostname + ':8080';

  constructor(private http: HttpClient) {
  }


  public logIn(user: any) {
    // creating base64 encoded String from user fullName and password
    let base64Credential: string = btoa(user.username + ':' + user.password);
    const httpOptions = new HttpHeaders().append('accept', 'application/json').append('authorization', 'Basic ' + base64Credential);
    return this.http.get(this.API_URL + '/account/login', {headers: httpOptions});
  }

  logOut() {
    // remove user from local storage to log user out
    return this.http.post(this.API_URL + '/logout', {});
  }
}
