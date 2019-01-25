import { Component, Input } from '@angular/core';
import { Icon } from '../../enums/icon.enum';
import { IconHelper } from '../../helpers/icon.helper';

@Component({
  selector: 'gym-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.css']
})
export class CaptionComponent {
  @Input() text: string;
  @Input() icon: Icon;

  constructor(private helper: IconHelper){}

  iconClass(): string {
    return this.helper.getIconClass(this.icon);
  }
}
