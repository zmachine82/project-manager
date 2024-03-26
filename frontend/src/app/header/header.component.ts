import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  email?: string | null  = ''

  constructor(public auth: Auth) {
    authState(this.auth).subscribe(res => {
      this.email = res?.email
    })
  }
}
