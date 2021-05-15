import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasPage } from './recetas.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasPage
  },
  {
    path: ':id',
    loadChildren: () => import('../recetas-single/recetas-single.module').then( m => m.RecetasSinglePageModule)
  },
  // {
  //   path: 'fav',
  //   loadChildren: () => import('../fav/fav.module').then( m => m.FavPageModule)
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasPageRoutingModule {}
