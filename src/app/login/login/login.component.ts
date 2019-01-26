import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Icon } from 'src/app/shared/enums/icon.enum';

@Component({
  selector: 'gym-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Icon = Icon;
  username: string;
  password: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submit(): void {
    if (this.authService.login(this.username, this.password)){
      console.log("success");
      this.router.navigate([this.authService.redirectUrl]);
    }
    else {
      console.log("failure");
      this.error = 'Login failed';
    }
  }

}
