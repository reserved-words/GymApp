import { Component } from "@angular/core";

@Component({
  selector: 'gym-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  pageTitle: string = 'My Gym App';
  pageText: string = 'This will be my gym application';
}