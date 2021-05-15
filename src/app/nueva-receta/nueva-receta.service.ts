import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { receta } from '../recetas/receta.model';

@Injectable({
  providedIn: 'root'
})
export class NuevaRecetaService {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
    ) { }

  addReceta(datos: receta){
    this.http.post<any>
    (environment.fireUrl + 'recetas.json',{...datos})
    .subscribe(data=>{
      console.log(data);
    });
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

}
