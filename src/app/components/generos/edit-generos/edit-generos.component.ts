import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../helpers/myErrorStateMatcher';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {ClasificacionService} from '../../../services/clasificacion.service';
import {GeneroService} from '../../../services/genero.service';
import {MatError} from '@angular/material/form-field';

@Component({
  selector: 'app-edit-generos',
  standalone: true,
  imports: [
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './edit-generos.component.html',
  styleUrl: './edit-generos.component.css'
})
export class EditGenerosComponent {
  generoFormGroup: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  idGenero!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private generoService: GeneroService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.generoFormGroup = this.createFormGroup();
  }

  ngOnInit() {

    this.generoFormGroup = this.formBuilder.group({
      idGenero: ['', []],
      nombre: ['', [
        Validators.required]],
      descripcion: ['', [
        Validators.required,
      ]],
    });

    this.getGeneroData();
  }

  getGeneroData() {
    this.route.queryParams
      .subscribe(params => {
        this.idGenero = params['id'];
      });

    this.generoService.getGenero(this.idGenero).subscribe(data => {
      if (data.code == 100) {
        Object.keys(this.generoFormGroup.controls).forEach(name => {
          if (this.generoFormGroup.controls[name]) {
            this.generoFormGroup.controls[name].patchValue(data.result[name])
          }
        })
      } else {
        setTimeout(() => {
          this.toasterService.showToaster('Error al agregar el registro.', "Aceptar");
        }, 300);
      }
    }, (err) => console.error('Failed!' + err));
  }

  get f() {
    return this.generoFormGroup.controls;
  }

  createFormGroup() {
    return new FormGroup({
      clasificacionUpdate: new FormGroup({
        nombre: new FormControl(),
        descripcion: new FormControl()
      })
    });
  }

  onUpdateRegistro() {
    this.submitted = true;
    if (!this.generoFormGroup.invalid) {
      this.generoService.updateGenero(this.generoFormGroup.value)
        .subscribe(data => {
          //console.log(data);
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
