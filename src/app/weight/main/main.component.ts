import { Component, OnInit } from '@angular/core';
import { WeightService } from 'src/app/services/weight.service';
import { IWeight } from 'src/app/shared/interfaces/weight';
import { IQueryResults } from 'src/app/shared/interfaces/queryResults';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class WeightMainComponent implements OnInit {

  list: IWeight[] = [];
  newEntry: IWeight = { date: new Date(), stones: 0, pounds: 0 }
  newEntryAsString: string;
  errorMessage: string;

  private poundsInAStone: number = 14;
  private minPoundsIncrement: number = 0.25;

  constructor(private service: WeightService) { 
    this.resetNewEntry();
  }

  ngOnInit() {
    this.subscribe(this.service.getWeights(), results => {
      this.list = results;
      this.resetNewEntry();
    });
  }

  resetNewEntry(){
    if (this.list.length){
      var lastEntry = this.list[0];
      this.newEntry.stones = lastEntry.stones;
      this.newEntry.pounds = lastEntry.pounds;
    }
    else {
      this.newEntry.stones = 0;
      this.newEntry.pounds = 0;
    }
    this.updateNewEntryString();
  }

  decreaseNewWeight(): void {
    if (this.newEntry.pounds === 0){
      this.newEntry.stones--;
      this.newEntry.pounds = this.poundsInAStone - this.minPoundsIncrement;
    }
    else {
      this.newEntry.pounds = this.newEntry.pounds - this.minPoundsIncrement;
    }
    this.updateNewEntryString();
  }

  increaseNewWeight(): void {
    if (this.newEntry.pounds === this.poundsInAStone - this.minPoundsIncrement) {
      this.newEntry.stones++;
      this.newEntry.pounds = 0;
    }
    else {
      this.newEntry.pounds = this.newEntry.pounds + this.minPoundsIncrement;
    }
    this.updateNewEntryString();
  }

  saveNewEntry(): void {
    this.service.insertWeight(this.newEntry).subscribe(
      success => {
        this.ngOnInit();
      },
      error => this.errorMessage = <any>error
    );
  }

  updateNewEntryString(): void {
    this.newEntryAsString = this.newEntry.stones + 'st ' + this.newEntry.pounds;
  }

  subscribe<T>(obs: Observable<IQueryResults<T>>, onSuccess: Function): void {
    obs.subscribe(
        response => onSuccess(response.rows.map(r => r.value)),
        error => this.errorMessage = <any>error
    );
  }
}
