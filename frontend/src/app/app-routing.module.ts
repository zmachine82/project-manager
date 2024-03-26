import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
