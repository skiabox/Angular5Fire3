import { Injectable } from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {UiService} from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  //emit events
  public exerciseChanged = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  public finishedExercisesChanged = new Subject<Exercise[]>();

  //other properties
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  //store subscriptions here
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) { }

  //methods
  public fetchAvailableExercises(): void
  {
    //emit ui service subject as true
    this.uiService.loadingStateChanged.next(true);

    //return this.availableExercises.slice(); //create a copy of the array
      this.fbSubs.push( this.db.collection('availableExercises')
        .snapshotChanges()  //snapshotChanges method gets data and meta-data
        .pipe(map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            } as Exercise;
          });
        }))
        .subscribe((exercises: Exercise[]) => {
          //console.log(exercises);

          //emit ui service subject as false
          this.uiService.loadingStateChanged.next(false);

          this.availableExercises = exercises;

          //emit exercises to interested components
          this.exercisesChanged.next([...this.availableExercises]);   //pass a copy for mutability reasons
        }, error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);

          //emit null if fetching of exercises failed
          this.exercisesChanged.next(null);
        }) );
  }


  public startExercise(selectedId: string): void
  {
    //-how to select a document and update it with a new field
    //this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);

    //emit running exercise
    this.exerciseChanged.next({ ...this.runningExercise }); //we don't want to return the same object
  }

  public completeExercise(): void
  {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelExercise(progress: number): void
  {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  public fetchCompletedOrCancelledExercises(): void {
    this.fbSubs.push( this.db
      .collection('finishedExercises')
      .valueChanges()     //we don't get the meta-data (the id of the document)
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }) );
  }

  public cancelSubscriptions(): void
  {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise): void
  {
    this.db.collection('finishedExercises').add(exercise);
  }
}
