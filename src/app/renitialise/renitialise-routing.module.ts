import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenitialisePage } from './renitialise.page';

const routes: Routes = [
  {
    path: '',
    component: RenitialisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenitialisePageRoutingModule {}
