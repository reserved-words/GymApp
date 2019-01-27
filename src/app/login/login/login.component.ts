import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Icon } from 'src/app/shared/enums/icon.enum';
import { DBService } from 'src/app/services/db.service';

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

  constructor(private authService: AuthService, private router: Router, private db: DBService) { }

  ngOnInit() {
  }

  submit(): void {
    this.authService.login(this.username, this.password);
    this.db.sync();
    this.router.navigate([this.authService.redirectUrl]);
  }

}
