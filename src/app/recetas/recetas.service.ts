import { HttpClient } from '@angular/common/http';
import { receta } from './receta.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  restaurantes: receta[] = [];
  restaurantesSub: Subscription;
  isLoading = false;

  constructor(private http: HttpClient) {}

  // getRestautante(restauranteId: string) {
  //   const url = environment.fireUrl + `recetas/${restauranteId}.json`;
  //   return this.http.get<receta>(url).pipe(
  //     map((dta) => {
  //       return new receta(
  //         restauranteId,
  //         dta.titulo,
  //         dta.ingredientes,
  //         dta.procedimiento,
  //         dta.imagen
  //       );
  //     })
  //   );
  // }

  //lo cambié, antes era get restaurantes
  getReceta(recetaId: string) {
    const url = environment.fireUrl + `recetas/${recetaId}.json`;
    return this.http.get<receta>(url).pipe(
      map((dta) => {
        return new receta(
          recetaId,
          dta.titulo,
          dta.ingredientes,
          dta.procedimiento,
          dta.imagen
        );
      })
    );
  }

  private _recetas = new BehaviorSubject<receta[]>([]);

  get recetass() {
    return this._recetas.asObservable();
  }

  fetchRecetas() {
    return this.http
      .get<{ [key: string]: receta }>(environment.fireUrl + 'recetas.json')
      .pipe(
        map((dta) => {
          const rests = [];
          for (const key in dta) {
            if (dta.hasOwnProperty(key)) {
              rests.push(
                new receta(
                  key,
                  dta[key].titulo,
                  dta[key].ingredientes,
                  dta[key].procedimiento,
                  dta[key].imagen
                )
              );
            }
          }
          return rests;
        }),
        tap((rest) => {
          this._recetas.next(rest);
        })
      );
  }

  updateReceta(recetaId: string, receta: receta) {
    const url = environment.fireUrl + `recetas/${recetaId}.json`;
    this.http.put<any>(url, { ... receta }).subscribe((data) => {
      console.log(data);
    });
  }
}
