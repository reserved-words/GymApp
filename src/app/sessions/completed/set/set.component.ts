import { Component, Input } from "@angular/core";
import { ISet } from "src/app/shared/interfaces/set";


@Component({
    selector: 'gym-completed-set',
    templateUrl: 'set.component.html',
    styleUrls: ['set.component.css']
})
export class CompletedSetComponent {
    @Input() set: ISet;
}