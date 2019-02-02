import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Icon } from 'src/app/shared/enums/icon.enum';
import { UpdatesService } from 'src/app/services/updates.service';

@Component({
  selector: 'pm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class SettingsMainComponent implements OnInit {
  Icon = Icon;

  constructor(private auth: AuthService, private router: Router, private updates: UpdatesService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  runUpdates() {
    this.updates.runUpdates().then(r => alert("Completed")).catch(err => alert(JSON.stringify(err)));
  }

}
