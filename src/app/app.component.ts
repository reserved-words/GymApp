import { Component, OnInit } from "@angular/core";
import { DBService } from "./services/db.service";

@Component({
  selector: 'gym-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private db: DBService) {}

  ngOnInit(): void {
    this.db.sync();
  }

}