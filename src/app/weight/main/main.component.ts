import { Component, OnInit, OnChanges } from '@angular/core';
import { WeightService } from 'src/app/services/weight.service';
import { IWeight } from 'src/app/shared/interfaces/weight';
import { IDataValueGroup } from 'src/app/shared/interfaces/dataValueGroup';
import { Icon } from 'src/app/shared/enums/icon.enum';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class WeightMainComponent implements OnInit {
  Icon = Icon;
  list: IWeight[] = [];
  dataValues: IDataValueGroup[] = [];
  newEntry: IWeight = { date: new Date(), kg: 0 };
  newEntryDateAsString: string;
  newEntryWeightAsString: string;
  errorMessage: string;
  displayTypes: string[] = ['Chart','Table'];
  displayType: string = 'Chart';
  minIncrement: number = 0.25;

  constructor(private service: WeightService) { 
    this.resetNewEntry();
  }

  ngOnInit() {
    this.service.getWeights().then(results => {
      this.list = results.rows.map(r => r.value);
      this.dataValues = [];
      var values = [];
      for (var item of this.list){
        values.push({ date: item.date, value: item.kg });
      }
      this.dataValues.push({ name: 'Body Weight', dataValues: values });
      this.resetNewEntry();
    });
  }

  resetNewEntry(){
    if (this.list.length){
      console.log(JSON.stringify(this.list));
      var lastEntry = this.list[0];
      this.newEntry.kg = Math.round(lastEntry.kg / this.minIncrement)*this.minIncrement;
    }
    else {
      this.newEntry.kg = 0;
    }
    this.updateNewEntryStrings();
  }

  decreaseNewWeight(): void {
    this.newEntry.kg = this.newEntry.kg - this.minIncrement;
    this.updateNewEntryStrings();
  }

  increaseNewWeight(): void {
    this.newEntry.kg = this.newEntry.kg + this.minIncrement;
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
    
    this.service.insertWeight(this.newEntry).then(
      success => {
        this.ngOnInit();
      }
    );
  }

  updateNewEntryStrings(): void {
    this.newEntryWeightAsString = this.newEntry.kg + 'kg';
    this.newEntryDateAsString = this.newEntry.date.toLocaleDateString("en-GB");
  }

  onChangeDisplayType(selectedType: string){
    this.displayType = selectedType;
  }
}
