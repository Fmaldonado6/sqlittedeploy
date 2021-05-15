import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasSinglePage } from './recetas-single.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasSinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasSinglePageRoutingModule {}
