import { NgModule } from '@angular/core';
import {TrainingComponent} from './training.component';
import {AuthGuard} from '../auth/auth.guard';
import {RouterModule, Routes} from '@angular/router';



const routes: Routes = [
  { path: '', component: TrainingComponent }  //path: 'training' becomes path: '' for lazy loading because it is appended to path: 'training' of app-routing.module.ts - we also remove auth guard from here
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
