import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {


  constructor(private http: HttpClient) {


  }

  submit(newSubmission: {name: string, email: string, projectDescription: string}): Observable<void> {
    return this.http.post<any>(environment.apiUrl + '/submissions', newSubmission)
  }


  getAllSubmissions(): Observable<any> {
    return this.http.get(environment.apiUrl +'/submissions');
    }
}


