import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username && this.username.trim() && this.password && this.password.trim()) {
      console.log('Login successful');
    } else {
      console.log('Username or password is empty');
    }
  }
}
