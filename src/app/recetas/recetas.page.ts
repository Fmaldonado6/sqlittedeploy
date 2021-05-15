import { Router } from '@angular/router';
//import { Router } from '@angular/router';
import { RecetasService } from './recetas.service';
import { receta } from './receta.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  recetas: receta[] = [];
  recetasSub: Subscription;
  isLoading = false;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private recetasService: RecetasService,

    //private router: Router
  ){ }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }


goToFav(){
  //this.router.navigateByUrl('/fav');
}

 ngOnInit() {
    //usamos un método de recetasService que baja los registros de la base de datos, así los guarda en un arreglo recetas
    //y luego lo vemos desplegado en el html
    //recetass es un método get que retorna un BehaviorSubject de un arreglo de recetas, el de recetas model

    this.recetasSub = this.recetasService.recetass.subscribe(rests=>{
      this.recetas = rests; //rests BehaviorSubject
      console.log(this.recetas);
    });

  }

  ngOnDestroy() {
    console.log("ngOnDestroy")
    // this.networkListener.remove();
  }

    goToAdd(){
      //con esta función vamos a la ventana de agregar receta,
      //donde podemos subir una imágen de la receta, su nombre y su preparación

      this.router.navigateByUrl('/nueva-receta');
    }

    // ngOnDestroy(){
    //   console.log('ANGULAR -> ngOnDestroy');

    //  if(this.recetasSub){
    //    this.recetasSub.unsubscribe();
    //  }
    //   }

    ionViewDidEnter(){
    console.log('IONIC -> ionViewDidEnter');
    console.log('IONIC -> ionViewWillEnter');
    this.isLoading = true;
    this.recetasSub = this.recetasService.fetchRecetas().subscribe(()=>{
      this.isLoading = false;
    });
    }

    // ngOnDestroy(){
    //  if(this.recetasSub){
    //    this.recetasSub.unsubscribe();
    //  }
    //   }
    // openSideMenu(){
    //   this.menuCtrl.open();
    // }
}
