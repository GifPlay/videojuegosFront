import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgSelectOption,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../helpers/myErrorStateMatcher';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {GeneroService} from '../../../services/genero.service';
import {JuegosServices} from '../../../services/juegos.services';
import {MatTableDataSource} from '@angular/material/table';
import {ConsolaService} from '../../../services/consola.services';
import {MatError, MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {ClasificacionService} from '../../../services/clasificacion.service';

@Component({
  selector: 'app-create-juegos',
  standalone: true,
  imports: [
    FormsModule,
    MatSelect,
    MatOption,
    MatError,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './create-juegos.component.html',
  styleUrl: './create-juegos.component.css'
})
export class CreateJuegosComponent {
  juegoFormGroup: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  idJuego!: number;
  propertyConsolas: NgSelectOption[] = [];
  propertyClasificaciones: NgSelectOption[] = [];
  propertyGeneros: NgSelectOption[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private juegosServices: JuegosServices,
    private consolaService: ConsolaService,
    private generoService: GeneroService,
    private clasificacionService: ClasificacionService,
    private formBuilder: FormBuilder,
  ) {
    this.juegoFormGroup = this.createFormGroup();
  }

  ngOnInit() {
    this.juegoFormGroup = this.formBuilder.group({
      titulo: ['', [
        Validators.required]],
      descripcion: ['', [
        Validators.required]],
      anio: ['', [
        Validators.required]],
      calificacion: ['', [
        Validators.required]],
      jugadores: ['', [
        Validators.required]],
      franquicia: ['', [
        Validators.required]],
      idConsola: ['', [
        Validators.required]],
      idClasificacion: ['', [
        Validators.required]],
      idGenero: ['', [
        Validators.required]]
    });

    this.getGeneros();
    this.getConsolas();
    this.getClasificaciones();
  }

 getGeneros(){
      this.generoService.getGeneros().subscribe(data => {
        if (data.code == 100) {
          let propertyGeneros: NgSelectOption[] = [];

          data.result.forEach(function (value: any) {
            propertyGeneros.push(<NgSelectOption>{
              value: value.idGenero,
              ngValue: value.nombre
            });
          });

          this.propertyGeneros = propertyGeneros;
        } else {
        }
      }, (err) => console.error('Failed! ' + err));
  }
  getConsolas(){
      this.consolaService.getConsolas().subscribe(data => {
        if (data.code == 100) {
          let propertyConsolas: NgSelectOption[] = [];

          data.result.forEach(function (value: any) {
            propertyConsolas.push(<NgSelectOption>{
              value: value.idConsola,
              ngValue: value.nombre.concat(' | ').concat(value.empresa),
            });
          });

          this.propertyConsolas = propertyConsolas;
        } else {
        }
      }, (err) => console.error('Failed! ' + err));
  }
  getClasificaciones(){
      this.clasificacionService.getClasificaciones().subscribe(data => {
        if (data.code == 100) {
          let propertyClasificaciones: NgSelectOption[] = [];
          data.result.forEach(function (value: any) {
            propertyClasificaciones.push(<NgSelectOption>{
              value: value.idClasificacion,
              ngValue: value.clasificacion.concat(' | Edad: ').concat(value.edad.toString()),
            });
          });
          this.propertyClasificaciones = propertyClasificaciones;
        } else {
        }
      }, (err) => console.error('Failed! ' + err));
  }

  get f() {
    return this.juegoFormGroup.controls;
  }

  createFormGroup() {
    return new FormGroup({
      juegoUpdate: new FormGroup({
        titulo: new FormControl(),
        descripcion: new FormControl(),
        anio: new FormControl(),
        calificacion: new FormControl(),
        jugadores: new FormControl(),
        franquicia: new FormControl(),
        idConsola: new FormControl(),
        idClasificacion: new FormControl(),
        idGenero: new FormControl(),
      })
    });
  }

  onUpdateRegistro() {
    this.submitted = true;
    if (!this.juegoFormGroup.invalid) {
      this.juegosServices.createJuegos(this.juegoFormGroup.value)
        .subscribe(data => {
          console.log(data);
          if (data.code == 100) {
            setTimeout(() => {
              this.toasterService.showToaster('Se creó el registro correctamente.', 'Aceptar');
              this.router.navigate(['/juegos']);
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
