import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Submission } from './models/submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {


  constructor(private http: HttpClient) {


  }

  submit(newSubmission: { name: string, email: string, projectDescription: string }): Observable<void> {
    return this.http.post<any>(environment.apiUrl + '/submissions', newSubmission)
  }


  getAllSubmissions(): Observable<Submission[]> {
    return this.http.get<Submission[]>(environment.apiUrl + '/submissions');
  }

  updateSubmission(submission: Submission) {
    console.log('we are submitting to the backend, forsure');

  }

  delete(submission: Submission) {

  }
}


