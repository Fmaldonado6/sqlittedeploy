import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

export interface ListaId{
  id:String;
}//ionic cordova run android -l

@Injectable({
  providedIn: 'root'
})
export class FavdbService {
  private storage: SQLiteObject;
  favLista = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'favoritos.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }



  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchLista(): Observable<ListaId[]> {
    return this.favLista.asObservable();
  }
  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/dump.sql',
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getLista();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }


  getListaF(id):boolean{
    let b:boolean=false;
     this.storage.executeSql('SELECT * FROM fav', []).then(res => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          if(res.rows.item(i).id==id){
            b=true;
          }
        }
      }
    });

    return b;
  }


  // Get list
  getLista(){
    return this.storage.executeSql('SELECT * FROM fav', []).then(res => {
      let items: ListaId[] = [];                                          //esta es la lista de favoritos
      if (res.rows.length > 0) {                                          //si existen datos en la DB, entonces:
        for (var i = 0; i < res.rows.length; i++){                        //por cada dato    if
          items.push({                                                    //asigna su id a un nuevo elemento de items
            id: res.rows.item(i).id
           });
        }
      }
      this.favLista.next(items);
    });
  }

  addFav(id){//añadir a favoritos
    let data = id;
    return this.storage.executeSql('INSERT INTO fav (id) VALUES (?)', data)
    .then(res => {////////////////////////////////////////////////////////////////creo que se puede omitir
      this.getLista(); //actualiza la lista que ya tienes
    });
  }

  // Get single object /////////////////////////////////////////////////////////creo que se puede omitir
  getFav(id): Promise<ListaId> {
    return this.storage.executeSql('SELECT * FROM fav WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id
      }
    });
  }

  // Delete
  deleteFav(id) {
    return this.storage.executeSql('DELETE FROM fav WHERE id = ?', [id])
    .then(_ => {
      this.getLista();
    });
  }


//end
}





/*// Get list
  getLista(){
    return this.storage.executeSql('SELECT * FROM fav', []).then(res => {
      let items: ListaId[] = [];                                          //esta es la lista de favoritos
      if (res.rows.length > 0) {                                          //si existen datos en la DB, entonces:
        for (var i = 0; i < res.rows.length; i++){                        //por cada dato    if
          items.push({                                                    //asigna su id a un nuevo elemento de items
            id: res.rows.item(i).id
           });
        }
      }
      this.favLista.next(items);
    });
  }*/
