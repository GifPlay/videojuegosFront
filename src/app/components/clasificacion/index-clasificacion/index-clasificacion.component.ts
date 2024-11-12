import {Component, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {ConsolaService} from '../../../services/consola.services';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConsolasComponent} from '../../consolas/delete-consolas/delete-consolas.component';
import {ShowConsolasComponent} from '../../consolas/show-consolas/show-consolas.component';
import {ClasificacionService} from '../../../services/clasificacion.service';

export interface clasificacion{
  id:number;
  clasificacion:string;
  edad:number;
  descripcion:string;
}

@Component({
  selector: 'app-index-clasificacion',
  standalone: true,
    imports: [
      MatTableModule, MatPaginator
    ],
  templateUrl: './index-clasificacion.component.html',
  styleUrl: './index-clasificacion.component.css'
})
export class IndexClasificacionComponent {
  displayedColumns: string[] = ['idClasificacion', 'clasificacion', 'edad', 'descripcion', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private clasificacionService: ClasificacionService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.getClasificaciones();
  }

  getClasificaciones() {
    this.clasificacionService.getClasificaciones().subscribe(data => {
      if (data.code == 100) {
        this.dataSource = new MatTableDataSource(data.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, (err) => console.error('Failed! ' + err));
  }

  editClasificacion(id: number): void {
    this.router.navigate(['/clasificaciones/edit'], { queryParams: { id: id } });
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
