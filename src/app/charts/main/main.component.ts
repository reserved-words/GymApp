import { Component, OnInit, OnChanges } from '@angular/core';
import { IExercise } from 'src/app/shared/interfaces/exercise';
import { ExercisesService } from 'src/app/services/exercises.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { SessionsHelper } from 'src/app/shared/helpers/sessions.helper';
import { IDataValue } from 'src/app/shared/interfaces/dataValue';

@Component({
  selector: 'pm-charts',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class ChartsMainComponent implements OnInit {

  addExerciseType: string;
    exercises: IExercise[];
    selectedExercise: string;
    selectedMeasurement: string;
    dataValues: IDataValue[] = [];
    title: string;

    constructor(private exercisesService: ExercisesService, private sessionsService: SessionsService, private helper: SessionsHelper){}

    ngOnInit(){
        this.exercisesService.subscribe(this.exercisesService.getExercises(), r => {
            this.exercises = r.rows.map(row => row.value);
            this.selectedExercise = this.exercises[0].name;
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
      this.dataValues = [];
      if (this.selectedMeasurement === "total") {
        this.title = this.selectedExercise + ' Total Weight (kg)';
        this.exercisesService.subscribe(this.exercisesService.getTotalWeight(this.selectedExercise), r => {
          this.dataValues = r.rows.map(row => row.value);
        });
      } else {
        this.title = this.selectedExercise + ' Maximum Weight (kg)';
        this.exercisesService.subscribe(this.exercisesService.getMaxWeight(this.selectedExercise), r => {
          this.dataValues = r.rows.map(row => row.value);
        });
      }
    }
}
