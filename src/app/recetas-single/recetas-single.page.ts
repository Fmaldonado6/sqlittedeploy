import { NuevaRecetaService } from './../nueva-receta/nueva-receta.service';
import { receta } from './../recetas/receta.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RecetasService } from '../recetas/recetas.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-recetas-single',
  templateUrl: './recetas-single.page.html',
  styleUrls: ['./recetas-single.page.scss'],
})
export class RecetasSinglePage implements OnInit {
  isLoading: boolean;

  receta: receta;
  recetaSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recetasService: RecetasService,
    private router: Router, // se agrega este parametro para navegar a otra pantalla
    private alertCtrl: AlertController, //se agrega este parametro para mostrar el alerta
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private nuevaRecetaService: NuevaRecetaService
  ) {
  }
  // getBackButtonText() {
  //   const win = window as any;
  //   const mode = win && win.Ionic && win.Ionic.mode;
  //   return mode === 'ios' ? 'Inbox' : '';
  // }

  ngOnInit() {
    console.log("recetas")
    this.activatedRoute.paramMap.subscribe((paramM) => {
      const param: string = 'id';
      if (!paramM.has(param)) {
        //redirect
        this.navCtrl.navigateBack('');
        return;
      }

      const restauranteId: string = paramM.get(param);
      // this.previsualizacion ='https://www.drupal.org/files/issues/2019-07-21/missing.png';

      this.isLoading = true;

      this.recetaSub = this.recetasService
        .getReceta(restauranteId)
        .subscribe(
          (rest) => {
            this.receta = rest;
            console.log(rest);
            if(this.receta.imagen != undefined){
              this.previsualizacion =this.receta.imagen;
            }else{
              this.previsualizacion ='https://www.drupal.org/files/issues/2019-07-21/missing.png';
            }
            this.isLoading = false;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: 'Error',
                message: 'Error al obtener la receta!',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      this.router.navigate(['']);
                    },
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
  }

  /////////////////////////////////////////////
  public previsualizacion: string ;
  public archivos: any = [];
  public loading: boolean;

  capturarFile(event): any {
    const archivoCapturado = event.target.files[0];
    this.nuevaRecetaService.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen.base);
      return imagen.base;
    });
    this.archivos.push(archivoCapturado);
    //
    // console.log(event.target.files);
  }

}
