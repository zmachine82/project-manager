export type Submission = {
  name: string,
  email: string,
  projectDescription: string,
  projectName: string,
  _id: string,
  notes?: string,
  earliestStartDate?: Date,
  deadline?: Date,
  codeCoach?: string
}
