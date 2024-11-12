import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../helpers/myErrorStateMatcher';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {ClasificacionService} from '../../../services/clasificacion.service';
import {GeneroService} from '../../../services/genero.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-index-generos',
  standalone: true,
  imports: [
    MatTableModule, MatPaginator
  ],
  templateUrl: './index-generos.component.html',
  styleUrl: './index-generos.component.css'
})
export class IndexGenerosComponent {
  displayedColumns: string[] = ['idGenero', 'nombre','descripcion', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private generoService: GeneroService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.getClasificaciones();
  }

  getClasificaciones() {
    this.generoService.getGeneros().subscribe(data => {
      if (data.code == 100) {
        this.dataSource = new MatTableDataSource(data.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, (err) => console.error('Failed! ' + err));
  }

  editGenero(id: number): void {
    this.router.navigate(['/generos/edit'], { queryParams: { id: id } });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
