import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ConsolaService} from '../../../services/consola.services';
import {ToasterService} from '../../../services/toaster.service';
import {JuegosServices} from '../../../services/juegos.services';

@Component({
  selector: 'app-delete-juegos',
  standalone: true,
  imports: [],
  templateUrl: './delete-juegos.component.html',
  styleUrl: './delete-juegos.component.css'
})
export class DeleteJuegosComponent {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DeleteJuegosComponent>,
    public juegosServices: JuegosServices,
    public toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public consola:any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.juegosServices.deleteJuegos(this.consola.id).subscribe(data => {
      if (data.code == 100) {
        this.dialogRef.close();
        this.toasterService.showToaster('El registro se ha eliminado correctamente.', "Aceptar");
        this.router.navigate(['/']);
      }
      else {
        this.toasterService.showToaster('El registro no se ha eliminado.', "Aceptar");
      }
    }, (err) => console.error('Failed! ' + err));
  }
}
