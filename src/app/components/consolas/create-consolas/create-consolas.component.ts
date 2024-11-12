import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../helpers/myErrorStateMatcher';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {ConsolaService} from '../../../services/consola.services';
import {Globals} from '../../../app.global';
import {MatError} from '@angular/material/form-field';

@Component({
  selector: 'app-create-consolas',
  standalone: true,
  imports: [
    MatError, ReactiveFormsModule
  ],
  templateUrl: './create-consolas.component.html',
  styleUrl: './create-consolas.component.css'
})
export class CreateConsolasComponent {

  consolaFormGroup: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  idConsola!: number;

  constructor(
    private http: HttpClient,
    //private dialog: MatDialog,
    private router: Router,
    private toasterService: ToasterService,
    private consolaService: ConsolaService,
    private route: ActivatedRoute,
    private globals: Globals,
    private formBuilder: FormBuilder,
  ) {
    this.consolaFormGroup = this.createFormGroup();
  }

  ngOnInit() {

    this.consolaFormGroup = this.formBuilder.group({
      empresa: ['', [
        Validators.required]],
      lanzamiento: ['', [
        Validators.required]],
      nombre: ['', [
        Validators.required,
      ]],
    });
  }

  get f() {
    return this.consolaFormGroup.controls;
  }

  createFormGroup() {
    return new FormGroup({
      consolaUpdate: new FormGroup({
        nombre: new FormControl(),
        lanzamiento: new FormControl(),
        empresa: new FormControl()
      })
    });
  }

  onUpdateConsola() {
    this.submitted = true;
    if (!this.consolaFormGroup.invalid) {
      this.consolaService.createConsola(this.consolaFormGroup.value)
        .subscribe(data => {
          console.log(data);
          if (data.code == 100) {
            setTimeout(() => {
              this.toasterService.showToaster('Se creó el registro correctamente.', 'Aceptar');
              this.router.navigate(['/consolas']);
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
