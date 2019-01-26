import { Injectable, OnInit } from "@angular/core";
import { Icon } from "../enums/icon.enum";
import { IIconClass } from "../interfaces/icon-class";

@Injectable({
    providedIn: 'root'
})
export class IconHelper {
    iconClasses: IIconClass[];

    getMappings(): IIconClass[]{
        if (!this.iconClasses){
            this.iconClasses = [
                { icon: Icon.Add, value: "fas fa-plus" },
                { icon: Icon.Back, value: "fas fa-caret-left" },
                { icon: Icon.Calendar, value: "far fa-calendar-alt" },
                { icon: Icon.Chart, value: "fas fa-chart-line" },
                { icon: Icon.Check, value: "fas fa-check" },
                { icon: Icon.CompletedSession, value: "fas fa-calendar-check" },
                { icon: Icon.CurrentSession, value: "far fa-calendar-alt" },
                { icon: Icon.Edit, value: "fas fa-pencil-alt" },
                { icon: Icon.Exercise, value: "fas fa-dumbbell" },
                { icon: Icon.LogIn, value: "fas fa-sign-in-alt" },
                { icon: Icon.LogOut, value: "fas fa-sign-out-alt" },
                { icon: Icon.PlannedSession, value: "far fa-edit" },
                { icon: Icon.Save, value: "fas fa-save" },
                { icon: Icon.Settings, value: "fas fa-cog" },
                { icon: Icon.Table, value: "fas fa-th-list" },
                { icon: Icon.Warmup, value: "fas fa-thermometer-quarter" },
                { icon: Icon.Weight, value: "fas fa-weight" }
            ];
        }
        return this.iconClasses;
    }

    getIconClass(icon: Icon): string {
        return this.getMappings().filter(i => i.icon === icon).map(i => i.value)[0];
    }

}