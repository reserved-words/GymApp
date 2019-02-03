import { Component, OnInit, OnChanges } from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { SessionsHelper } from 'src/app/shared/helpers/sessions.helper';
import { IDataValue } from 'src/app/shared/interfaces/dataValue';
import { IDataValueGroup } from 'src/app/shared/interfaces/dataValueGroup';
import { IQueryResponse } from 'src/app/shared/interfaces/queryResponse';
import { Icon } from 'src/app/shared/enums/icon.enum';
import { IChartType } from 'src/app/shared/interfaces/chart-type';

@Component({
  selector: 'pm-charts',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class ChartsMainComponent implements OnInit {
    Icon = Icon;
    addExerciseType: string;
    dataValues: IDataValueGroup[];
    title: string;
    exercises: string[];
    displayTypes: string[] = ['Chart','Table'];
    chartTypes: IChartType[] = [];
    selectedExercise: string;
    selectedDisplayType: string = 'Chart';
    selectedChartType: number = 1;
    loading: boolean = true;
    
    constructor(private exercisesService: ExercisesService, private sessionsService: SessionsService, private helper: SessionsHelper){}

    ngOnInit(){
        this.chartTypes = [
          { id: 1, name: 'Max Weight', view: 'max-weight'},
          { id: 2, name: 'Max Ratio', view: 'max-weight-ratio'},
          { id: 3, name: 'Total Weight', view: 'total-weight'}
        ];
        this.exercisesService.getExercises().then(r => {
          this.exercises = r.rows.map(row => row.value.name);
          this.exercises.splice(0, 0, "All");
          this.selectedExercise = this.exercises[0];
          this.updateData();
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          alert(err.message);
        });
    }

    onChangeExercise(){
      this.updateData();
    }

    onChangeChartType(){
      this.updateData();
    }

    updateData(){
      if (!this.selectedChartType){
        this.selectedChartType = 1;
      }

      var chartType = this.chartTypes.filter(m => m.id == this.selectedChartType)[0];
      
      var newTitle = (this.selectedExercise === "All" ? "" : (this.selectedExercise + " ")) + chartType.name;

      if (this.title === newTitle)
        return;

      this.loading = true;
      this.title = newTitle;
      this.dataValues = [];
      var exercise = this.selectedExercise === "All" ? null : this.selectedExercise;
      
      this.exercisesService.getView(chartType.view, exercise).then(r => {
        this.populateDataValues(r);
      });
    }

    populateDataValues(results: IQueryResponse<IDataValue>) {
      var newValues: IDataValueGroup[] = [];
      var currentValuesGroup = null;
      for (var row of results.rows){
        var exercise = row.key[0];
        if (!currentValuesGroup || (exercise != currentValuesGroup.name)){
          currentValuesGroup = { name: exercise, dataValues: [] };
          newValues.push(currentValuesGroup);
        }
        currentValuesGroup.dataValues.push({ date: row.value.date, value: row.value.value });
      }
      this.dataValues = newValues;
      this.loading = false;
    }

    onChangeDisplayType(selectedType: string){
      this.selectedDisplayType = selectedType;
    }
}
