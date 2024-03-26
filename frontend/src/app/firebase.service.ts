import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {



  constructor(
    private Auth: Auth
  ) {
  }

  tryToSignUp(userData: { email: string, password: string }): Observable<string> {
    return from(createUserWithEmailAndPassword(this.Auth, userData.email, userData.password))
      .pipe(switchMap(x => {

        return of('')
      }), catchError((err) => {
        return of(err.toString())
      }))
  }

  tryToSignIn(userData: { email: string, password: string }): Observable<string> {
    return from(signInWithEmailAndPassword(this.Auth, userData.email, userData.password))
    .pipe(switchMap(x => {
      return of('')
    }), catchError((err) => {
      return of(err.toString())
    }))
  }


}
