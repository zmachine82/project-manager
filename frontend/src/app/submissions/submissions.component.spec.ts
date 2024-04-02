import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsComponent } from './submissions.component';
import { MockProvider, MockService } from 'ng-mocks';
import { SubmissionsService } from '../submissions.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('SubmissionsComponent', () => {
  let component: SubmissionsComponent;
  let submissionService: SubmissionsService;
  beforeEach(() => {
    submissionService = MockService(SubmissionsService)

    component = new SubmissionsComponent(submissionService);
  });

  it('should be able to submit a valid form', () => {
    component.form.setValue({
      name: 'Nonprofit Billy',
      email: 'billy@place.com',
      projectDescription: 'I need help because I am tech iliterated'
    })

    expect(component.canSubmitForm()).toBe(true)

  })

  it('should not be able to submit a form missing a name', () => {
    component.form.setValue({
      name: '',
      email: 'billy@place.com',
      projectDescription: 'I need help because I am tech iliterated'
    })

    expect(component.canSubmitForm()).toBe(false)
  })

  it('should not be able to submit a form missing an email', () => {
    component.form.setValue({
      name: 'Nonprofit Billy',
      email: '',
      projectDescription: 'I need help because I am tech iliterated'
    })

    expect(component.canSubmitForm()).toBe(false)
  })

  it('should not be able to submit a form missing a description', () => {
    component.form.setValue({
      name: 'Nonprofit Billy',
      email: 'billy@place.com',
      projectDescription: ''
    })

    expect(component.canSubmitForm()).toBe(false)
  })

  it('should not be able to submit a form with bad email', () => {
    component.form.setValue({
      name: 'Nonprofit Billy',
      email: '555-5555',
      projectDescription: 'I need help because I am tech iliterated'
    })

    expect(component.canSubmitForm()).toBe(false)
  })


  it('should be able to submit to the backend', () => {
    component.form.setValue({
      name: 'Nonprofit Billy',
      email: 'billy@place.com',
      projectDescription: 'I need help because I am tech iliterated'
    })
    spyOn(submissionService, 'submit').and.returnValue(of())

    component.submitForm()

    expect(submissionService.submit).toHaveBeenCalledOnceWith({
      name: 'Nonprofit Billy',
      email: 'billy@place.com',
      projectDescription: 'I need help because I am tech iliterated'
    })

  })

  it('when successfully submits, should clear the form', () => {
    component.form.setValue({
      name: 'Nonprofit Billy',
      email: 'billy@place.com',
      projectDescription: 'I need help because I am tech iliterated'
    })
    spyOn(submissionService, 'submit').and.returnValue(of(void 0))

    component.submitForm()

    expect(component.form.value).toEqual({
      name: '',
      email: '',
      projectDescription: ''
    })

  })

  it('when fails to submit, should display error message', () => {
    component.form.setValue({
      name: 'Nonprofit Billy',
      email: 'billy@place.com',
      projectDescription: 'I need help because I am tech iliterated'
    })
    spyOn(submissionService, 'submit').and.returnValue(throwError(() =>'oops'))

    expect(component.submissionError).toBe(false)
    component.submitForm()

    expect(component.submissionError).toBe(true)

  })

})









describe('SubmissionsComponent', () => {
  let component: SubmissionsComponent;
  let fixture: ComponentFixture<SubmissionsComponent>;
  let submissionsService: SubmissionsService;

  let nameField: DebugElement;
  let emailField: DebugElement;
  let descriptionField: DebugElement;
  let submitButton: DebugElement;
  let errorMessage: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SubmissionsComponent],
      providers: [MockProvider(SubmissionsService)]
    });
    fixture = TestBed.createComponent(SubmissionsComponent);
    submissionsService = TestBed.inject(SubmissionsService)
    component = fixture.componentInstance;
    nameField = fixture.debugElement.query(By.css('#name'))
    emailField = fixture.debugElement.query(By.css('#email'))
    descriptionField = fixture.debugElement.query(By.css('#description'))
    submitButton = fixture.debugElement.query(By.css('#submit'))
    errorMessage = fixture.debugElement.query(By.css('#errorMessage'))
    fixture.detectChanges();
  });

  it('should submit a valid form', () => {
    nameField.nativeElement.value = 'Bob'
    nameField.nativeElement.dispatchEvent(new Event('input'));

    emailField.nativeElement.value = 'Bob@wow.com'
    emailField.nativeElement.dispatchEvent(new Event('input'));

    descriptionField.nativeElement.value = 'Bob wants to build a cool thing'
    descriptionField.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges()
    spyOn(submissionsService, 'submit').and.returnValue(of(void 0))

    submitButton.nativeElement.click()
    fixture.detectChanges()

    expect(submissionsService.submit).toHaveBeenCalled();
  });

  it('should show error when issues submitting', () => {
    nameField.nativeElement.value = 'Bob'
    nameField.nativeElement.dispatchEvent(new Event('input'));

    emailField.nativeElement.value = 'Bob@wow.com'
    emailField.nativeElement.dispatchEvent(new Event('input'));

    descriptionField.nativeElement.value = 'Bob wants to build a cool thing'
    descriptionField.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges()
    spyOn(submissionsService, 'submit').and.returnValue(throwError(() => 'oops again'))

    expect(errorMessage).toBeFalsy()
    submitButton.nativeElement.click()
    fixture.detectChanges()
    errorMessage = fixture.debugElement.query(By.css('#errorMessage'))
    expect(errorMessage.nativeElement.textContent.trim()).toBe('Somethings wrong, try again later');
  });
});
