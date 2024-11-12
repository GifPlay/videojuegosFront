import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../helpers/myErrorStateMatcher';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {ConsolaService} from '../../../services/consola.services';
import {Globals} from '../../../app.global';
import {ClasificacionService} from '../../../services/clasificacion.service';
import {MatError} from '@angular/material/form-field';

@Component({
  selector: 'app-create-clasificacion',
  standalone: true,
  imports: [
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './create-clasificacion.component.html',
  styleUrl: './create-clasificacion.component.css'
})
export class CreateClasificacionComponent {

  clasificacionFormGroup: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  idClasificacion!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private clasificacionService: ClasificacionService,
    private formBuilder: FormBuilder,
  ) {
    this.clasificacionFormGroup = this.createFormGroup();
  }

  ngOnInit() {

    this.clasificacionFormGroup = this.formBuilder.group({
      clasificacion: ['', [
        Validators.required]],
      edad: ['', [
        Validators.required,
      Validators.minLength(0)]],
      descripcion: ['', [
        Validators.required,
      ]],
    });
  }

  get f() {
    return this.clasificacionFormGroup.controls;
  }

  createFormGroup() {
    return new FormGroup({
      clasificacionUpdate: new FormGroup({
        clasificacion: new FormControl(),
        edad: new FormControl(),
        descripcion: new FormControl()
      })
    });
  }

  onUpdateRegistro() {
    this.submitted = true;
    if (!this.clasificacionFormGroup.invalid) {
      this.clasificacionService.createClasificacion(this.clasificacionFormGroup.value)
        .subscribe(data => {
          console.log(data);
          if (data.code == 100) {
            setTimeout(() => {
              this.toasterService.showToaster('Se creó el registro correctamente.', 'Aceptar');
              this.router.navigate(['/clasificaciones']);
            }, 300);
          } else {
            setTimeout(() => {
              this.toasterService.showToaster('Error al agregar el registro.', "Aceptar");
            }, 300);
          }
        }, (err) => console.error('Failed! ' + err));
    }
  }

}
