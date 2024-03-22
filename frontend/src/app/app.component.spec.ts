import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MockComponent } from "ng-mocks";

describe('AppComponent', () => {
  let router: Router
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent, MockComponent(SignUpComponent)]
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




});
