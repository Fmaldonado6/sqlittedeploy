import { Component, OnInit } from '@angular/core';
import { NuevaRecetaService } from './nueva-receta.service'
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { RecetasService } from '../recetas/recetas.service';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-nueva-receta',
  templateUrl: './nueva-receta.page.html',
  styleUrls: ['./nueva-receta.page.scss'],
})
export class NuevaRecetaPage implements OnInit {
  constructor(
      private nuevaRecetaService: NuevaRecetaService,
      public formBuilder: FormBuilder,
      private router: Router,
    private cameraService: CameraService,
      private recetasService: RecetasService
    ) { }

  recipeForm: FormGroup;
  // Data: any[] = [];
  previsualizacion: string = 'https://www.drupal.org/files/issues/2019-07-21/missing.png';

  ngOnInit(){
    //construye el form inicianizandolo con valores vacíos
    this.recipeForm = this.formBuilder.group({
      titulo: [''],
      ingredientes: [''],
      procedimiento: ['']
    });
  }

/*export class receta
{
  constructor(
    public id:string,
    public titulo: string,
    public ingredientes: string,
    public procedimiento: string[],
    public Imagen: string,
    ){}
} */

//esta función sube a firebase los datos del form como un nuevo elemento de "recetas.json"
  storeNewRecipe(){
    // if(this.recipeForm.value.imagen != undefined && this.recipeForm.value.imagen != null){
    //   //con esta condición intentamos que cuando no haya subido una imagen, suba una foto de archivo no encontrado
    //   this.nuevaRecetaService.addReceta({
    //     id:null,
    //     titulo:this.recipeForm.value.titulo,
    //     ingredientes:this.recipeForm.value.ingredientes,
    //     procedimiento:this.recipeForm.value.procedimiento,
    //     imagen:this.recipeForm.value.imagen
    //   });
    // }else{
      this.nuevaRecetaService.addReceta({
        id:null,
        titulo:this.recipeForm.value.titulo,
        ingredientes:this.recipeForm.value.ingredientes,
        procedimiento:this.recipeForm.value.procedimiento,
        imagen: this.previsualizacion
      });
    // }

    this.router.navigateByUrl('');

  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  public archivos: any = []

  // capturarFile(event): any {
  //   const archivoCapturado = event.target.files[0]
  //   this.nuevaRecetaService.extraerBase64(archivoCapturado).then((imagen: any) => {
  //   this.previsualizacion = imagen.base;

  //     console.log(imagen.base);
  //     return imagen.base;
  //   })
  //   this.archivos.push(archivoCapturado)
  //   //
  //   // console.log(event.target.files);
  // }

  async takePhoto(){
    const photo = await this.cameraService.getPhoto()
    this.previsualizacion = 'data:image/jpeg;base64,'+ photo.base64String;
  }
}
