import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SongPageRoutingModule } from './song-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SongPage } from './song.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SongPage]
})
export class SongPageModule {}
