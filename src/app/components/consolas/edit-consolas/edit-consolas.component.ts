import { Component } from '@angular/core';
import { MatError } from "@angular/material/form-field";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MyErrorStateMatcher } from '../../../../helpers/myErrorStateMatcher';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { ConsolaService } from '../../../services/consola.services';
import { Globals } from '../../../app.global';

@Component({
  selector: 'app-edit-consolas',
  standalone: true,
    imports: [
        MatError,
        ReactiveFormsModule
    ],
  templateUrl: './edit-consolas.component.html',
  styleUrl: './edit-consolas.component.css'
})
export class EditConsolasComponent {
  consolaFormGroup: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  idConsola!: number;
  id!:number

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
      idConsola: ['', []],
      empresa: ['', [
        Validators.required]],
      lanzamiento: ['', [
        Validators.required]],
      nombre: ['', [
        Validators.required,
      ]],
    });

      this.getConsolaData();
  }

  getConsolaData() {
    this.route.queryParams
      .subscribe(params => {
        this.idConsola = params['id'];
      });

    this.consolaService.getConsola(this.idConsola).subscribe(data => {
      if (data.code == 100) {
        console.log(data.result)
        Object.keys(this.consolaFormGroup.controls).forEach(name => {
          if (this.consolaFormGroup.controls[name]) {
            this.consolaFormGroup.controls[name].patchValue(data.result[name])
          }
        })
      }else{
        setTimeout(() => {
          this.toasterService.showToaster('Error al agregar el registro.', "Aceptar");
        }, 300);
      }
    }, (err) => console.error('Failed!' + err));
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
      this.consolaService.updateConsola(this.consolaFormGroup.value)
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
