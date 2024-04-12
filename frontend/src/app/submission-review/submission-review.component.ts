import { Component } from '@angular/core';
import { SubmissionReviewForm } from './submission-review-form';
import { SubmissionsService } from '../submissions.service';

@Component({
  selector: 'app-submission-review',
  templateUrl: './submission-review.component.html',
  styleUrls: ['./submission-review.component.css']
})
export class SubmissionReviewComponent {

  submissionReviewForm: SubmissionReviewForm;

  constructor(private submissionService: SubmissionsService) {
    this.submissionReviewForm = new SubmissionReviewForm({
      name: "some dude",
      email: "wow@wow.com",
      projectDescription: "I want a cool project made but I am broke",
      projectName: "make thing for me",
      _id: "1234dsagsad"
    }, submissionService)
  }

}
