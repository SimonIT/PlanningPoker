import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-planning-poker-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: any = {};
  errorMessage: string;

  ngOnInit(): void {
  }

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  /**
   * fetchs the from the ldap and saves it as string in the local storage
   */
  login() {
    this.userService.getUserByUsername(this.user.username).subscribe((user: any) => {
      if (user && user.guid) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/welcome']);
      } else {
        this.errorMessage = 'User ' + this.user.username + ' not found!';
      }
    });
  }

  /**
   * remove the error message to hide
   */
  public closeAlert() {
    this.errorMessage = undefined;
  }
}
