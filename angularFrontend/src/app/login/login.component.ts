import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-planning-poker-login',
  templateUrl: './planning-poker-login.component.html',
  styleUrls: ['./planning-poker-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningPokerLoginComponent implements OnInit {
  user: any = {};
  errorMessage: string;

  ngOnInit(): void {
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.logIn(this.user).subscribe((data: any) => {
        this.router.navigate(['/welcome']);
      }, err => {
        this.errorMessage = 'error :  Username or password is incorrect';
      }
    );

  }

}
