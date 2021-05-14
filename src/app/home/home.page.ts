import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  mainForm: FormGroup;
  Data: any[] = [];

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchCitas().subscribe(item => {
          this.Data = item
        })
      }
    });

    this.mainForm = this.formBuilder.group({
      usuario_id: [''],
      nombre: [''],
      fecha: [''],
      hora: [''],
      sintomas: ['']
    })
  }

  storeData() {
    this.db.addCita(
      this.mainForm.value.usuario_id,
      this.mainForm.value.nombre,
      this.mainForm.value.fecha,
      this.mainForm.value.hora,
      this.mainForm.value.sintomas,
    ).then((res) => {
      this.mainForm.reset();
    })
  }

  deleteCita(id){
    this.db.deleteCita(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Cita borrada',
        duration: 2500
      });
      toast.present();
    })
  }



}
