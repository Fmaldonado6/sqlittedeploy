
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Cita } from './cita-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  citasList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
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

  fetchCitas(): Observable<Cita[]> {
    return this.citasList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql',
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getCitas();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getCitas(){
    return this.storage.executeSql('SELECT * FROM citas', []).then(res => {//where usuario_id = USUARIO_ID
      let items: Cita[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            usuario_id: res.rows.item(i).usuario_id,
            nombre: res.rows.item(i).nombre,
            fecha:res.rows.item(i).fecha,
            hora: res.rows.item(i).hora,
            sintomas: res.rows.item(i).sintomas,
           });
        }
      }
      this.citasList.next(items);
    });
  }

  /*export class Cita {
  usuario_id: number;
    nombre: string;
    fecha:string;
    hora:string;
    sintomas: string;
}
 */

  // Add
  addCita(usuario_id, nombre, fecha,hora,sintomas) {
    let data = [usuario_id,nombre, fecha, hora, sintomas];
    return this.storage.executeSql('INSERT INTO citas (usuario_id, nombre, fecha, hora, sintomas) VALUES (?,?, ?, ?, ?)', data)
    .then(res => {
      this.getCitas();
    });
  }

  // Get single object
  getCita(id): Promise<Cita> {
    return this.storage.executeSql('SELECT * FROM citas WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        usuario_id: res.rows.item(0).usuario_id,
        nombre: res.rows.item(0).nombre,
        fecha: res.rows.item(0).fecha,
        hora: res.rows.item(0).hora,
        sintomas: res.rows.item(0).sintomas
      }
    });
  }

  // Update
  updateCita(id, cita: Cita) {
    let data = [cita.usuario_id, cita.nombre, cita.fecha, cita.hora, cita.sintomas];
    return this.storage.executeSql(`UPDATE citas SET usuario_id = ?, nombre = ?, fecha = ?, hora = ?, sintomas = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getCitas();
    })
  }

  // Delete
  deleteCita(id) {
    return this.storage.executeSql('DELETE FROM citas WHERE id = ?', [id])
    .then(_ => {
      this.getCitas();
    });
  }
}
