import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SignUpComponent } from './sign-up/sign-up.component';
import {  MockComponents,  MockProviders } from "ng-mocks";
import { SignInComponent } from './sign-in/sign-in.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { HeaderComponent } from './header/header.component';
import { Auth } from '@angular/fire/auth';
import { SubmissionsComponent } from './submissions/submissions.component';
import { SubmissionsService } from './submissions.service';
import { AdminComponent } from './admin/admin.component';
import { SubmissionReviewComponent } from './submission-review/submission-review.component';

describe('AppComponent', () => {
  let router: Router
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent, MockComponents(SignUpComponent, SignInComponent, TicTacToeComponent, HeaderComponent, AdminComponent, SubmissionReviewComponent)],
      providers: [MockProviders(Auth, SubmissionsService)]
    })

    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should display the sign up component when navigating to /sign-up', async () => {
    await router.navigateByUrl('/')
    let signUpPage = fixture.debugElement.query(By.directive(SignUpComponent))
    expect(signUpPage).toBeFalsy();

    await router.navigateByUrl('/sign-up')
    fixture.detectChanges();

    signUpPage = fixture.debugElement.query(By.directive(SignUpComponent))
    expect(signUpPage).toBeTruthy();
  })

  it('should display the sign in component when navigating to /sign-in', async () => {
    await router.navigateByUrl('/')
    let signInPage = fixture.debugElement.query(By.directive(SignInComponent))
    expect(signInPage).toBeFalsy();

    await router.navigateByUrl('/sign-in')
    fixture.detectChanges();

    signInPage = fixture.debugElement.query(By.directive(SignInComponent))
    expect(signInPage).toBeTruthy();
  })

  it('should display the secret game component when navigating to /secret', async () => {
    await router.navigateByUrl('/')
    let ticTacToePage = fixture.debugElement.query(By.directive(TicTacToeComponent))
    expect(ticTacToePage).toBeFalsy();

    await router.navigateByUrl('/secret')
    fixture.detectChanges();

    ticTacToePage = fixture.debugElement.query(By.directive(TicTacToeComponent))
    expect(ticTacToePage).toBeTruthy();
  })

  it('should display the submission component', async () => {
    await router.navigateByUrl('/')
    let submissions = fixture.debugElement.query(By.directive(SubmissionsComponent))
    expect(submissions).toBeTruthy();
  })

  it('should display the admin component when navigating to /admin', async () => {
    await router.navigateByUrl('/')
    let adminPage = fixture.debugElement.query(By.directive(AdminComponent))
    expect(adminPage).toBeFalsy();

    await router.navigateByUrl('/admin')
    fixture.detectChanges();

    adminPage = fixture.debugElement.query(By.directive(AdminComponent))
    expect(adminPage).toBeTruthy();
  })


  it('should display the submission-review component when navigating to /admin/submission/{id}', async () => {
    await router.navigateByUrl('/')
    let submissionReviewPage = fixture.debugElement.query(By.directive(SubmissionReviewComponent))
    expect(submissionReviewPage).toBeFalsy();

    await router.navigateByUrl('/admin/submission/123')
    fixture.detectChanges();

    submissionReviewPage = fixture.debugElement.query(By.directive(SubmissionReviewComponent))
    expect(submissionReviewPage).toBeTruthy();
  })





});
