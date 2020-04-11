import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {PlanningPokerService} from './planning-poker.service';
import {CardService} from './card.service';
import {UserService} from './user.service';
import {PlanningPokerListComponent} from './planning-poker-list/planning-poker-list.component';
import {PlanningPokerEditComponent} from './planning-poker-edit/planning-poker-edit.component';
import {PlanningPokerRateComponent} from './planning-poker-rate/planning-poker-rate.component';
import {LoginComponent} from './login/login.component';
import {PlanningPokerResultComponent} from './planning-poker-result/planning-poker-result.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {StoryService} from './story.service';
import {RatingService} from './rating.service';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

const appRoutes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'planningpoker-list',
    component: PlanningPokerListComponent
  },
  {
    path: 'planningpoker-add',
    component: PlanningPokerEditComponent
  },
  {
    path: 'planningpoker-edit/:id',
    component: PlanningPokerEditComponent
  },
  {
    path: 'planningpoker-rate/:id',
    component: PlanningPokerRateComponent
  },
  {
    path: 'planningpoker-result/:id',
    component: PlanningPokerResultComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    PlanningPokerListComponent,
    PlanningPokerEditComponent,
    PlanningPokerRateComponent,
    PlanningPokerResultComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PlanningPokerService, CardService, UserService, RatingService, StoryService, AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
