import {Component, ViewChild, viewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { ConsolaService } from '../../../services/consola.services';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConsolasComponent } from '../delete-consolas/delete-consolas.component';
import {ShowConsolasComponent} from '../show-consolas/show-consolas.component';

export interface consolas{
  id:number;
  empresa:string;
  lanzamiento:number;
  nombre:string;
}

@Component({
  selector: 'app-index-consolas',
  standalone: true,
  imports: [MatTableModule, MatPaginator],
  templateUrl: './index-consolas.component.html',
  styleUrl: './index-consolas.component.css'
})

export class IndexConsolasComponent{
  displayedColumns: string[] = ['idConsola', 'empresa', 'lanzamiento', 'nombre', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private consolaService: ConsolaService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.getConsolas();
  }

  getConsolas() {
    this.consolaService.getConsolas().subscribe(data => {
      if (data.code == 100) {
        //console.log(data.result);
        this.dataSource = new MatTableDataSource(data.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {

      }
    }, (err) => console.error('Failed! ' + err));
  }

  editConsola(id: number): void {
    this.router.navigate(['/consolas/edit'], { queryParams: { id: id } });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteConsolasComponent, {
      width: '450px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  showConsola(id: number): void {
    const dialogRef = this.dialog.open(ShowConsolasComponent, {
      width: '800px',
      height: '800px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

}
