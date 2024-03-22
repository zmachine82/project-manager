import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor() { }

  tryToSignUp(tryToSignUp: any): Observable<string>  {
    return of('')
  }
}
