import { RecetasPageModule } from './../recetas/recetas.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recetas',
        loadChildren: () => import('../recetas/recetas.module').then( m => m.RecetasPageModule),
        },
        {
        path: 'fav',
        loadChildren: () => import('../fav/fav.module')
        .then( m => m.FavPageModule)
        }
    ]
  },
  {
    path:'',
    redirectTo: '/tabs/tabs/recetas',
    pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
