import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasPageRoutingModule } from './citas-routing.module';

import { CitasPage } from './citas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CitasPageRoutingModule
  ],
  declarations: [CitasPage]
})
export class CitasPageModule {}
