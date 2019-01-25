import { Component, OnInit, OnChanges } from '@angular/core';
import { WeightService } from 'src/app/services/weight.service';
import { IWeight } from 'src/app/shared/interfaces/weight';
import { IDataValueGroup } from 'src/app/shared/interfaces/dataValueGroup';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class WeightMainComponent implements OnInit {

  list: IWeight[] = [];
  dataValues: IDataValueGroup[] = [];
  newEntry: IWeight = { date: new Date(), stones: 0, pounds: 0 }
  newEntryDateAsString: string;
  newEntryWeightAsString: string;
  errorMessage: string;
  displayTypes: string[] = ['Chart','Table'];
  displayType: string = 'Chart';

  private poundsInAStone: number = 14;
  private minPoundsIncrement: number = 0.25;

  constructor(private service: WeightService) { 
    this.resetNewEntry();
  }

  ngOnInit() {
    this.service.subscribe(this.service.getWeights(), results => {
      this.list = results.rows.map(r => r.value);
      this.dataValues = [];
      var values = [];
      for (var item of this.list){
        values.push({ date: item.date, value: 0.453592 * (14 * item.stones + item.pounds) });
      }
      this.dataValues.push({ name: 'Body Weight', dataValues: values });
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
    this.updateNewEntryStrings();
  }

  decreaseNewWeight(): void {
    if (this.newEntry.pounds === 0){
      this.newEntry.stones--;
      this.newEntry.pounds = this.poundsInAStone - this.minPoundsIncrement;
    }
    else {
      this.newEntry.pounds = this.newEntry.pounds - this.minPoundsIncrement;
    }
    this.updateNewEntryStrings();
  }

  increaseNewWeight(): void {
    if (this.newEntry.pounds === this.poundsInAStone - this.minPoundsIncrement) {
      this.newEntry.stones++;
      this.newEntry.pounds = 0;
    }
    else {
      this.newEntry.pounds = this.newEntry.pounds + this.minPoundsIncrement;
    }
    this.updateNewEntryStrings();
  }

  changeNewEntryDate(): void {
    console.log(this.newEntryDateAsString);
    var parts = this.newEntryDateAsString.split("/");
    this.newEntry.date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    console.log(this.newEntry.date);
    this.updateNewEntryStrings();  
  }

  saveNewEntry(): void {
    if (this.newEntryDateAsString == 'Invalid Date'){
      alert('Invalid date');
      return;
    }
    
    this.service.subscribe(this.service.insertWeight(this.newEntry),
      success => {
        this.ngOnInit();
      }
    );
  }

  updateNewEntryStrings(): void {
    this.newEntryWeightAsString = this.newEntry.stones + 'st ' + this.newEntry.pounds;
    this.newEntryDateAsString = this.newEntry.date.toLocaleDateString("en-GB");
  }

  onChangeDisplayType(selectedType: string){
    this.displayType = selectedType;
  }
}
