import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {UiService} from '../../shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  //properties
  public exercises: Exercise[];
  public isLoading: boolean = true;

  //subscriptions
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises); //this.exercises will be null if fetching of exercises fails

    //fetch exercises
    this.fetchExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();

    if (this.loadingSubscription)
      this.loadingSubscription.unsubscribe();
  }

  //methods
  public onStartTraining(form: NgForm): void
  {
    this.trainingService.startExercise(form.value.exercise);
  }

  public fetchExercises(): void
  {
    this.trainingService.fetchAvailableExercises();
  }

}
