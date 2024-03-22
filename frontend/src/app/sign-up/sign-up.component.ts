import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private firebaseService: FirebaseService, private router: Router){}

  formIsValid(): any {

    if (this.email === '' || this.password === '') {
      return  false
    } else {
      return true
    }
  }

  submitButtonDisabled(): boolean {
    return !this.formIsValid()
  }

  submitForm() {
    if(this.formIsValid()) {
      this.firebaseService.tryToSignUp({email: this.email, password: this.password}).subscribe(message => {
        this.errorMessage = message;
        if(message == '') {
          this.router.navigateByUrl('/')
        }
      } )
    }
  }
}
