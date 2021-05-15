import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasSinglePageRoutingModule } from './recetas-single-routing.module';

import { RecetasSinglePage } from './recetas-single.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RecetasSinglePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RecetasSinglePage]
})
export class RecetasSinglePageModule {}
