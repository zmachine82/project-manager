import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubmissionsService } from '../submissions.service';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent {

  form: FormGroup;
  submissionError: boolean = false;

  constructor(private submissionsService: SubmissionsService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      projectDescription: new FormControl('', Validators.required),
    })
  }

  canSubmitForm(): boolean {
    return this.form.valid
  }


  submitForm() {
    this.submissionError = false
    this.submissionsService.submit(this.form.value).pipe(
      catchError((err: any, caught: Observable<void>) => {
        // form fails to submit
        this.submissionError = true
        return caught
      })
    ).subscribe(() => {
      // form successfully submits
      this.form.setValue({
        name: '',
        email: '',
        projectDescription: ''
      })
    });
  }


}
