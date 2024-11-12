import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ConsolaService} from '../../../services/consola.services';
import {ToasterService} from '../../../services/toaster.service';

@Component({
  selector: 'app-delete-consolas',
  standalone: true,
  imports: [],
  templateUrl: './delete-consolas.component.html',
})
export class DeleteConsolasComponent {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DeleteConsolasComponent>,
    public consolaService: ConsolaService,
    public toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public consola:any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.consolaService.deleteConsola(this.consola.id).subscribe(data => {
      if (data.code == 100) {
        this.dialogRef.close();
        this.toasterService.showToaster('El registro se ha eliminado correctamente.', "Aceptar");
        this.router.navigate(['/consolas']);
      }
      else {
        this.toasterService.showToaster('El registro no se ha eliminado.', "Aceptar");
      }
    }, (err) => console.error('Failed! ' + err));
  }

}
