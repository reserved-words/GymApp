import { Component, Input } from '@angular/core';
import { Icon } from '../../enums/icon.enum';

@Component({
  selector: 'gym-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.css']
})
export class CaptionComponent {
  @Input() text: string;
  @Input() icon: Icon;

  iconClass(): string {
    return this.getFontAwesomeClass(this.icon);
  }

  getFontAwesomeClass(icon: Icon): string {
    switch(icon){
      case Icon.Weight:
        return "fas fa-weight";
        case Icon.Exercise:
        return "fas fa-dumbbell";
        case Icon.PlannedSession:
        return "far fa-edit";
        case Icon.CompletedSession:
        return "far fa-calendar-check";
        case Icon.CurrentSession:
        case Icon.Calendar:
        return "far fa-calendar-alt";
        case Icon.Edit:
        return "fas fa-pencil-alt";
        case Icon.Warmup:
        return "fas fa-thermometer-quarter";
        case Icon.Save:
        return "fas fa-save";
        case Icon.Back:
        return "fas fa-caret-left";
        case Icon.Add:
        return "fas fa-plus";
        case Icon.LogOut:
        return "fas fa-sign-out-alt";
        case Icon.Settings:
        return "fas fa-cog";
        case Icon.Check:
        return "fas fa-check";
        case Icon.Chart:
        return "fas fa-chart-line";
        case Icon.Table:
        return "fas fa-th-list";
    }
  }
}
