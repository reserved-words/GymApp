import { Injectable } from "@angular/core";
import { IDropdownOption } from "../interfaces/dropdown-option";
import { Frequency } from "../enums/frequency.enum";

@Injectable({
    providedIn: 'root'
})
export class DropdownHelper {

    getFrequencyOptions(): IDropdownOption[]{
        return [
            { value: Frequency.EverySession, text: "Every session" },
            { value: Frequency.EveryOtherSession, text: "Every other session" },
            { value: Frequency.EveryThirdSession, text: "One in every three" },
            { value: Frequency.TwoInEveryThreeSessions, text: "Two in every three" }
        ];
    }

}