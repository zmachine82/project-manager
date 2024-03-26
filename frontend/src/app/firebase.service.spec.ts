import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { Auth, connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import { environment } from '../environments/environment.development';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from, lastValueFrom } from 'rxjs';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let auth: Auth;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
          if (auth) {
            return auth
          }
          auth = getAuth();

          connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
          return auth;
        }),
        HttpClientModule
      ]
    });
    service = TestBed.inject(FirebaseService);
    await lastValueFrom(TestBed.inject(HttpClient).delete(`http://localhost:9099/emulator/v1/projects/${environment.firebase.projectId}/accounts`))
  });

  afterEach(() => {

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return no error message, when successful', done => {
    service.tryToSignUp({ email: 'wow@wow.com', password: '12345678' }).subscribe(message => {
      expect(message).toEqual('')
      expect(auth.currentUser?.email).toBe('wow@wow.com')
      done()
    })
  })

  it('should return an error message, when not successful', done => {
    service.tryToSignUp({ email: 'wow@wow.com', password: '' }).subscribe(message => {
      expect(message).not.toEqual('')
      done()
    })
  })

  it('should be able to sign in, after signing up', done => {
    const userData = { email: 'wow@wow.com', password: '12345678' }
    service.tryToSignUp(userData).subscribe(() => {
      service.tryToSignIn(userData).subscribe(message => {
        expect(message).toEqual('')
        expect(auth.currentUser?.email).toBe('wow@wow.com')
        done()
      })
    })
  })

  it('should return an error message, when signing in not successful', done => {
    service.tryToSignIn({ email: 'wow@wow.com', password: '12345678' }).subscribe(message => {
      expect(message).not.toEqual('')
      done()
    })
  })


});
