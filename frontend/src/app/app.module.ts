import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { HeaderComponent } from './header/header.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { AdminComponent } from './admin/admin.component';
import { SubmissionsListComponent } from './admin/submissions-list/submissions-list.component';
import { SubmissionReviewComponent } from './submission-review/submission-review.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    AuthFormComponent,
    HeaderComponent,
    TicTacToeComponent,
    SubmissionsComponent,
    AdminComponent,
    SubmissionsListComponent,
    SubmissionReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();

      if(environment.useEmulator) {

        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
