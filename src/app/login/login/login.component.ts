import { Component, OnInit } from '@angular/core';

import { AuthenticatorService } from 'src/app/services/authenticator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  username = '';
  password = '';
  
  constructor(private authenticatorService: AuthenticatorService) {
    this.authenticatorService = authenticatorService;
  }

  ngOnInit(): void { }

  login() {
    this.authenticatorService.login('guilherme', '123');
  }

  changeUsername(obj:any) {
    console.log('obj',obj)
  }

}
