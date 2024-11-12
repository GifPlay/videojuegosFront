import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../helpers/myErrorStateMatcher';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {ClasificacionService} from '../../../services/clasificacion.service';
import {GeneroService} from '../../../services/genero.service';
import {MatError} from '@angular/material/form-field';

@Component({
  selector: 'app-create-generos',
  standalone: true,
  imports: [
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './create-generos.component.html',
  styleUrl: './create-generos.component.css'
})
export class CreateGenerosComponent {
  generoFormGroup: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  idGenero!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private generoService: GeneroService,
    private formBuilder: FormBuilder,
  ) {
    this.generoFormGroup = this.createFormGroup();
  }

  ngOnInit() {

    this.generoFormGroup = this.formBuilder.group({
      nombre: ['', [
        Validators.required]],
      descripcion: ['', [
        Validators.required]]
    });
  }

  get f() {
    return this.generoFormGroup.controls;
  }

  createFormGroup() {
    return new FormGroup({
      generoUpdate: new FormGroup({
        nombre: new FormControl(),
        descripcion: new FormControl()
      })
    });
  }

  onUpdateRegistro() {
    this.submitted = true;
    if (!this.generoFormGroup.invalid) {
      this.generoService.createGenero(this.generoFormGroup.value)
        .subscribe(data => {
          console.log(data);
          if (data.code == 100) {
            setTimeout(() => {
              this.toasterService.showToaster('Se creó el registro correctamente.', 'Aceptar');
              this.router.navigate(['/generos']);
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
