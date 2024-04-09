import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { AdminComponent } from './admin/admin.component';
import { SubmissionReviewComponent } from './submission-review/submission-review.component';

export const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'secret', component: TicTacToeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/submission/:id', component: SubmissionReviewComponent},

  {path: '', component: SubmissionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
