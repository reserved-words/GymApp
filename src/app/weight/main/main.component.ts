import { Component, OnInit, OnChanges } from '@angular/core';
import { WeightService } from 'src/app/services/weight.service';
import { IWeight } from 'src/app/shared/interfaces/weight';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class WeightMainComponent implements OnInit {

  list: IWeight[] = [];
  dates: Date[] = [];
  values: number[] = [];
  newEntry: IWeight = { date: new Date(), stones: 0, pounds: 0 }
  newEntryAsString: string;
  errorMessage: string;
  displayType: string = 'chart';

  private poundsInAStone: number = 14;
  private minPoundsIncrement: number = 0.25;

  constructor(private service: WeightService) { 
    this.resetNewEntry();
  }

  ngOnInit() {
    this.service.subscribe(this.service.getWeights(), results => {
      this.list = results.rows.map(r => r.value);
      this.dates = this.list.map(r => r.date);
      this.values = this.list.map(r => 14*r.stones + r.pounds);
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
    this.service.subscribe(this.service.insertWeight(this.newEntry),
      success => {
        this.ngOnInit();
      }
    );
  }

  onChangeDisplayType(type: string){
    this.displayType = type;
    console.log(this.displayType);
  }

  updateNewEntryString(): void {
    this.newEntryAsString = this.newEntry.stones + 'st ' + this.newEntry.pounds;
  }
}
