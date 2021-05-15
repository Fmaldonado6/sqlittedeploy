import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasSinglePageRoutingModule } from './recetas-single-routing.module';

import { RecetasSinglePage } from './recetas-single.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasSinglePageRoutingModule
  ],
  declarations: [RecetasSinglePage]
})
export class RecetasSinglePageModule {}
