import { MockService } from "ng-mocks"
import { Submission } from "../models/submission"
import { SubmissionReviewForm } from "./submission-review-form"
import { SubmissionsService } from "../submissions.service"

describe('SubmissionReviewForm', () => {
  it('should prepopulate the form, with the data from the submission', () => {
    const {formObject, submission} = setup()

    expect(formObject.form.value.name).toEqual(submission.name)
    expect(formObject.form.value.email).toEqual(submission.email)
    expect(formObject.form.value.projectDescription).toEqual(submission.projectDescription)
    expect(formObject.form.value.projectName).toEqual(submission.projectName)
    expect(formObject.form.value.notes).toEqual(submission.notes)
    expect(formObject.form.value.earliestStartDate).toEqual(submission.earliestStartDate)
    expect(formObject.form.value.deadline).toEqual(submission.deadline)
    expect(formObject.form.value.codeCoach).toEqual(submission.codeCoach)
  })

  it('should not be able to save changes because by default no changes were made', () => {
    const {formObject} = setup()

    expect(formObject.areThereChanges()).toEqual(false);
  })

  it('should be able to save changes when user changed the form', () => {
    const {formObject} = setup()

    formObject.form.controls['projectName'].setValue("Neat Project")

    expect(formObject.areThereChanges()).toEqual(true);
  })

  it('should not allow approval to happen if unsaved changes', () => {
    const {formObject} = setup()
    expect(formObject.canApprove()).toEqual(true)

    formObject.form.controls['projectName'].patchValue("")

    expect(formObject.canApprove()).toEqual(false)
  })

  it('should call backend with change, on save changes clicked', () => {
    const {formObject, mock, submission} = setup()
    const updateSpy = spyOn(mock, 'updateSubmission')

    formObject.form.controls['projectName'].patchValue("garbage")
    formObject.saveChanges();
    expect(updateSpy).toHaveBeenCalledWith({...submission, projectName: 'garbage' })
  })

  it('should call backend with change, if there is no change', () => {
    const {formObject, mock} = setup()
    const updateSpy = spyOn(mock, 'updateSubmission')
    formObject.saveChanges();
    expect(updateSpy).not.toHaveBeenCalled()
  })

  it('should delete submissions when called', () => {
    const {formObject, mock, submission} = setup()
    const deleteSpy = spyOn(mock, 'delete')
    formObject.deleteSubmission();
    expect(deleteSpy).toHaveBeenCalledWith(submission)
  })

})


function setup(overrides: Partial<Submission> = {}) {
  const submission: Submission = Object.assign({
    name: "some dude",
    email: "wow@wow.com",
    projectDescription: "I want a cool project made but I am broke",
    projectName: "make thing for me",
    _id: "1234dsagsad"
  }, overrides)

  const mock = MockService(SubmissionsService)

  const formObject = new SubmissionReviewForm(submission, mock)
  return {formObject, mock, submission}
}

