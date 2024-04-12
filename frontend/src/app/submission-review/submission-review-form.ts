import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Submission } from "../models/submission";
import { SubmissionsService } from "../submissions.service";

export class SubmissionReviewForm {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    projectDescription: new FormControl(''),
    projectName: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
    earliestStartDate: new FormControl(''),
    deadline: new FormControl(''),
    codeCoach: new FormControl('')
  })

  constructor(private submission: Submission, private submissionService: SubmissionsService) {
    this.form.patchValue({
      email: submission.email,
      name: submission.name,
      projectDescription: submission.projectDescription,
      projectName: submission.projectName,
      notes: submission.notes,
      earliestStartDate: submission.earliestStartDate,
      deadline: submission.deadline,
      codeCoach: submission.codeCoach
    })
  }

  areThereChanges(): boolean {
    for (let key of Object.keys(this.form.value)) {
      const result = this.form.value[key] != (this.submission as any)[key]
      if (result) {
        return true;
      }
    }

    return false
  }

  canApprove(): boolean {
    return !this.areThereChanges() && this.form.valid
  }

  saveChanges() {
    if(this.areThereChanges()) {
      const changedSubmission: Submission = Object.assign(this.submission, this.form.value)
      this.submissionService.updateSubmission(changedSubmission)
    }
  }

  deleteSubmission() {
    this.submissionService.delete(this.submission)
  }


}
