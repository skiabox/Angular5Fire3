import { NgModule } from '@angular/core';

import {CurrentTrainingComponent} from './current-training/current-training.component';
import {TrainingComponent} from './training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {StopTrainingComponent} from './current-training/stop-training.component';

import {SharedModule} from '../shared/shared.module';
import {TrainingRoutingModule} from './training-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
