import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {

  constructor() { }

  submit(newSubmission: {name: string, email: string, projectDescription: string}): Observable<void> {
    return of()
  }
}
