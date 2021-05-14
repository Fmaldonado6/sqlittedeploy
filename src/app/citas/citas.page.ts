import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.db.getCita(this.id).then(res => {
      this.editForm.setValue({
        usuario_id: res['usuario_id'],
        nombre: res['nombre'],
        fecha: res['fecha'],
        hora: res['hora'],
        sintomas: res['sintomas'],
      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      usuario_id: [''],
      nombre:[''],
      fecha:[''],
      hora: [''],
      sintomas: ['']
    })
  }

  saveForm(){
    this.db.updateCita(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/home']);
    })
  }

}
