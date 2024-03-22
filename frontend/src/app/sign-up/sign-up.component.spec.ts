import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FirebaseService } from '../firebase.service';
import { MockProvider, MockService } from 'ng-mocks';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('SignupComponent fast tests', () => {
  let component: SignUpComponent;
  let firebaseService: FirebaseService
  let router: Router;
  beforeEach(() => {
    firebaseService = MockService(FirebaseService)
    router = MockService(Router)
    component = new SignUpComponent(firebaseService, router)
  });

  it('email field is required', () => {
    fillOutForm({ email: '' })
    expect(component.formIsValid()).toBe(false);

    fillOutForm({ email: 'test@wow.com' })
    expect(component.formIsValid()).toBe(true);
  })

  it('password field is required', () => {
    fillOutForm({ password: '' })
    expect(component.formIsValid()).toBe(false);

    fillOutForm({ password: '12345678' })
    expect(component.formIsValid()).toBe(true);
  })

  it('should be able to submit a valid sign up form', () => {
    spyOn(firebaseService, 'tryToSignUp').and.returnValue(of(''))
    fillOutForm()
    component.submitForm()
    expect(firebaseService.tryToSignUp).toHaveBeenCalledWith({ email: component.email, password: component.password })
  })

  it('should not be able to submit an invalid sign up form', () => {
    spyOn(firebaseService, 'tryToSignUp').and.returnValue(of(''))
    fillOutForm({ email: '' })
    component.submitForm()
    expect(firebaseService.tryToSignUp).not.toHaveBeenCalledWith({ email: component.email, password: component.password })
  })

  it('should display error messages from firebase when submissions fails', () => {
    spyOn(router, 'navigateByUrl')
    spyOn(firebaseService, 'tryToSignUp').and.returnValue(of('Ope, thats a duplicate bud'))
    expect(component.errorMessage).toBe('')

    fillOutForm()
    component.submitForm()

    expect(component.errorMessage).toBe('Ope, thats a duplicate bud')
    expect(router.navigateByUrl).not.toHaveBeenCalled()
  })

  it('should navigate back to home page when signed up succesfully', () => {
    spyOn(router, 'navigateByUrl')
    spyOn(firebaseService, 'tryToSignUp').and.returnValue(of(''))

    fillOutForm()
    component.submitForm()

    expect(router.navigateByUrl).toHaveBeenCalledWith('/')
  })

  it('submit button is disabled when form is invalid', () => {
    fillOutForm({ email: '' })
    expect(component.submitButtonDisabled()).toBe(true)
  })

  it('submit button is enable when form is valid', () => {
    fillOutForm()
    expect(component.submitButtonDisabled()).toBe(false)
  })





  function fillOutForm(data: Partial<{ email: string, password: string }> = {}) {
    const defaultValues = { email: 'test@wow.com', password: '12345678' }
    const values = Object.assign(defaultValues, data)
    component.email = values.email
    component.password = values.password;
  }

})


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let emailInput: DebugElement;
  let passwordInput: DebugElement;
  let submitButton: DebugElement;
  let errorMessageContainer: DebugElement;
  let firebaseService: FirebaseService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes(routes)],
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

  it('should not submit invalid form', fakeAsync((done: any) => {
    fixture.whenStable().then(() => {

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
      expect(firebaseService.tryToSignUp).not.toHaveBeenCalled()
      done()

    })

  }));


});
