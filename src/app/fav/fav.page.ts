import { Component, OnInit } from '@angular/core';
import { FavdbService, ListaId } from './../services/favdb.service'

import { ActivatedRoute, Router } from "@angular/router";
import { RecetasService } from '../recetas/recetas.service';
import { receta } from '../recetas/receta.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {
  id: any;
  constructor(
    private db:FavdbService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    // this.id = this.actRoute.snapshot.paramMap.get('id');

    // this.db.getCita(this.id).then(res => {
    //   //DESPLIEGA EN PANTALLA CAMBIANDO VARIABLES OBSERVABLES
    // })
  }
  Data : ListaId[]=[];
  help:number;

  recetas: receta[] = [];
  recetasSub: Subscription;
  isLoading = false;

  ngOnInit() {
    this.help=0;
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchLista().subscribe((item) => {
          this.Data = item;
        });
      }
    });
    // if(this.Data[0].id == "-M_i1VtmBc5KBug5khMv"){
    //   this.help = 1;
    // }
  }


}
