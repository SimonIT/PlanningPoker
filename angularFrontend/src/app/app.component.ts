import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Planning Poker';
  currentUser;

  constructor(private authService: AuthService, private router: Router, private meta: Meta) {
    this.meta.addTag({name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'});
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut() {
    this.authService.logOut().subscribe(
      data => {
        this.currentUser = undefined;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      },
      error => {
      });
  }

  ngOnInit(): void {

  }
}
