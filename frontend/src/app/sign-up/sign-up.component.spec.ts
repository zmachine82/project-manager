import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FirebaseService } from '../firebase.service';
import { MockProvider, MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthFormComponent } from '../auth-form/auth-form.component';


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let emailInput: DebugElement;
  let passwordInput: DebugElement;
  let submitButton: DebugElement;
  let errorMessageContainer: DebugElement;
  let firebaseService: FirebaseService;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent, AuthFormComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [MockProvider(FirebaseService)]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    emailInput = fixture.debugElement.query(By.css('#email'))
    passwordInput = fixture.debugElement.query(By.css('#password'))
    submitButton = fixture.debugElement.query(By.css('#submitButton'))
    errorMessageContainer = fixture.debugElement.query(By.css('#errorMessage'))
    firebaseService = TestBed.inject(FirebaseService)
    router = TestBed.inject(Router)
    fixture.detectChanges();
    await fixture.whenStable().then(() => {})
  });

  it('should submit valid form', done => {
    fixture.whenStable().then(() => {

      expect(errorMessageContainer.nativeElement.textContent.trim()).toBe('')
      expect(submitButton.nativeElement.disabled).toBe(true)

      emailInput.nativeElement.value = 'test@wow.com'
      emailInput.nativeElement.dispatchEvent(new Event('input'));

      passwordInput.nativeElement.value = '12345678'
      passwordInput.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges()



      spyOn(firebaseService, 'tryToSignUp').and.returnValue(of(''))
      spyOn(router, 'navigateByUrl')

      submitButton.nativeElement.click()
      fixture.detectChanges()

      expect(router.navigateByUrl).toHaveBeenCalled()
      done()

    })

  });

  it('should not submit invalid form', fakeAsync( () => {


    expect(errorMessageContainer.nativeElement.textContent.trim()).toBe('')
    expect(submitButton.nativeElement.disabled).toBeTruthy()

    emailInput.nativeElement.value = 'test@wow.com'
    emailInput.nativeElement.dispatchEvent(new Event('input'));

    passwordInput.nativeElement.value = '12345678'
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges()
    fixture.detectChanges()
    submitButton = fixture.debugElement.query(By.css('#submitButton'))


    spyOn(firebaseService, 'tryToSignUp').and.returnValue(of('error message'))
    spyOn(router, 'navigateByUrl')

    submitButton.nativeElement.click()
    tick()
    fixture.detectChanges()
    expect(errorMessageContainer.nativeElement.textContent.trim()).toBe('error message')
    expect(router.navigateByUrl).not.toHaveBeenCalled()

  }));


});
