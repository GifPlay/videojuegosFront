import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ConsolaService} from '../../../services/consola.services';
import {ToasterService} from '../../../services/toaster.service';

@Component({
  selector: 'app-show-consolas',
  standalone: true,
  imports: [],
  templateUrl: './show-consolas.component.html',
  styleUrl: './show-consolas.component.css'
})
export class ShowConsolasComponent {

  empresa: any;
  lanzamiento: any;
  nombre: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ShowConsolasComponent>,
    public consolaService: ConsolaService,
    public toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public consola:any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.consolaService.getConsola(this.consola.id).subscribe(data => {
      if (data.code == 100) {
        this.consola = data.result['nombre'];
      }
      else {
        this.toasterService.showToaster('El registro no se ha eliminado.', "Aceptar");
      }
    }, (err) => console.error('Failed! ' + err));
  }
}
