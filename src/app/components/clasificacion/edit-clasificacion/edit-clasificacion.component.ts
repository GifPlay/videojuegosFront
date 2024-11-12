import {Component} from '@angular/core';
import {MatError} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../helpers/myErrorStateMatcher';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {ClasificacionService} from '../../../services/clasificacion.service';

@Component({
  selector: 'app-edit-clasificacion',
  standalone: true,
  imports: [
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './edit-clasificacion.component.html',
  styleUrl: './edit-clasificacion.component.css'
})
export class EditClasificacionComponent {
  clasificacionFormGroup: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  idClasificacion!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private clasificacionService: ClasificacionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.clasificacionFormGroup = this.createFormGroup();
  }

  ngOnInit() {

    this.clasificacionFormGroup = this.formBuilder.group({
      idClasificacion: ['', []],
      clasificacion: ['', [
        Validators.required]],
      edad: ['', [
        Validators.required,
        Validators.minLength(0)]],
      descripcion: ['', [
        Validators.required,
      ]],
    });

    this.getClasificacionData();
  }

  getClasificacionData() {
    this.route.queryParams
      .subscribe(params => {
        this.idClasificacion = params['id'];
      });

    this.clasificacionService.getClasificacion(this.idClasificacion).subscribe(data => {
      if (data.code == 100) {
        console.log(data.result)
        Object.keys(this.clasificacionFormGroup.controls).forEach(name => {
          if (this.clasificacionFormGroup.controls[name]) {
            this.clasificacionFormGroup.controls[name].patchValue(data.result[name])
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
      this.clasificacionService.updateClasificacion(this.clasificacionFormGroup.value)
        .subscribe(data => {
          //console.log(data);
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
