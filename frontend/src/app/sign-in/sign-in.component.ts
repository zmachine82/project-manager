import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private firebaseService: FirebaseService, private router: Router){}

}
