import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenitialisePageRoutingModule } from './renitialise-routing.module';

import { RenitialisePage } from './renitialise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenitialisePageRoutingModule
  ],
  declarations: [RenitialisePage]
})
export class RenitialisePageModule {}
