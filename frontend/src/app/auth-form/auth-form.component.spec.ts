import { Router } from "@angular/router";
import { MockService } from "ng-mocks";
import { of } from "rxjs";
import { FirebaseService } from "../firebase.service";
import { SignInComponent } from "../sign-in/sign-in.component";
import { AuthFormComponent } from "./auth-form.component";

describe('SignInComponent fast tests', () => {
  let component: AuthFormComponent;
  let firebaseService: FirebaseService
  let router: Router;
  beforeEach(() => {
    firebaseService = MockService(FirebaseService)
    router = MockService(Router)
    component = new AuthFormComponent(firebaseService, router)
    component.type = 'sign-up'
  });

  it('email field is required', () => {
    fillOutForm({ email: '' })
    expect(component.formIsValid()).toBe(false);

    fillOutForm({ email: 'test@wow.com' })
    expect(component.formIsValid()).toBe(true);
  })


  it('email field should be a valid email', () => {
    fillOutForm({ email: 'wqgweqgwq' })
    expect(component.formIsValid()).toBe(false);

    fillOutForm({ email: 'wqgweqgwq@wow.com' })
    expect(component.formIsValid()).toBe(true);
  })

  it('password field is required', () => {
    fillOutForm({ password: '' })
    expect(component.formIsValid()).toBe(false);

    fillOutForm({ password: '12345678' })
    expect(component.formIsValid()).toBe(true);
  })

  it('password field must be at least 6 characters', () => {
    fillOutForm({ password: '12345' })
    expect(component.formIsValid()).toBe(false);

    fillOutForm({ password: '123456' })
    expect(component.formIsValid()).toBe(true);
  })

  it('should be able to submit a valid sign up form', () => {
    spyOn(firebaseService, 'tryToSignUp').and.returnValue(of(''))
    fillOutForm()
    component.submitForm()
    expect(firebaseService.tryToSignUp).toHaveBeenCalledWith({ email: component.form.value.email, password: component.form.value.password })
  })

  it('should not be able to submit an invalid sign up form', () => {
    spyOn(firebaseService, 'tryToSignUp').and.returnValue(of(''))
    fillOutForm({ email: '' })
    component.submitForm()
    expect(firebaseService.tryToSignUp).not.toHaveBeenCalledWith({ email: component.form.value.email, password: component.form.value.password })
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
    component.form.setValue(values)
  }

})
