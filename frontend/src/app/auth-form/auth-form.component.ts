import { Component, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {

  @Input() type: string = ''


  errorMessage: string = '';
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })



  constructor(private firebaseService: FirebaseService, private router: Router) { }

  formIsValid(): boolean {
    return this.form.valid
  }

  submitButtonDisabled(): boolean {
    return !this.formIsValid()
  }

  submitForm() {
    if (this.formIsValid()) {
      if(this.type === 'sign-up') {
        this.firebaseService.tryToSignUp(this.form.value).subscribe(message => {
          this.setErrorMessage(message)
        })
      } else {
        this.firebaseService.tryToSignIn(this.form.value).subscribe(message => {
          this.setErrorMessage(message)
        })
      }
    }
  }

  private setErrorMessage(error: string) {
    this.errorMessage = error;
    if (error == '') {
      this.router.navigateByUrl('/')
    }
  }

}
