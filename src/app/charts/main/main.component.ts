import { Component, OnInit, OnChanges } from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { SessionsHelper } from 'src/app/shared/helpers/sessions.helper';
import { IDataValue } from 'src/app/shared/interfaces/dataValue';
import { IDataValueGroup } from 'src/app/shared/interfaces/dataValueGroup';
import { IQueryResults } from 'src/app/shared/interfaces/queryResults';

@Component({
  selector: 'pm-charts',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class ChartsMainComponent implements OnInit {

  addExerciseType: string;
    exercises: string[];
    selectedExercise: string;
    selectedMeasurement: string;
    dataValues: IDataValueGroup[];
    title: string;

    constructor(private exercisesService: ExercisesService, private sessionsService: SessionsService, private helper: SessionsHelper){}

    ngOnInit(){
        this.exercisesService.subscribe(this.exercisesService.getExercises(), r => {
          this.exercises = r.rows.map(row => row.value.name);
          this.exercises.splice(0, 0, "All");
          this.selectedExercise = this.exercises[0];
          this.updateData();
        });
    }

    onChangeExercise(){
      this.updateData();
    }

    onChangeMeasurementType(){
      this.updateData();
    }

    updateData(){
      if (!this.selectedMeasurement){
        this.selectedMeasurement = "max";
      }
      
      var newTitle = (this.selectedExercise === "All" ? "" : (this.selectedExercise + " ")) 
        + (this.selectedMeasurement === "total" ? "Total" : "Maximum") 
        + " Weight (kg)";

      if (this.title === newTitle)
        return;

      this.title = newTitle;
      this.dataValues = [];
      var exercise = this.selectedExercise === "All" ? null : this.selectedExercise;
      
      if (this.selectedMeasurement === "total") {
        this.exercisesService.subscribe(this.exercisesService.getTotalWeight(exercise), r => {
          this.populateDataValues(r);
        });
      } else {
        this.exercisesService.subscribe(this.exercisesService.getMaxWeight(exercise), r => {
          this.populateDataValues(r);
        });
      }
    }

    populateDataValues(results: IQueryResults<IDataValue>) {
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
    }
}
