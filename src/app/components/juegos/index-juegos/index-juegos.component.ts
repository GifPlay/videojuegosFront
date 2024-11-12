import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToasterService} from '../../../services/toaster.service';
import {ConsolaService} from '../../../services/consola.services';
import {MatDialog} from '@angular/material/dialog';
import {DeleteConsolasComponent} from '../../consolas/delete-consolas/delete-consolas.component';
import {ShowConsolasComponent} from '../../consolas/show-consolas/show-consolas.component';
import {JuegosServices} from '../../../services/juegos.services';
import {DeleteJuegosComponent} from '../delete-juegos/delete-juegos.component';
import {ShowJuegosComponent} from '../show-juegos/show-juegos.component';

export interface consolas{
  id:number;
  titulo:string;
  descripcion:string;
  anio:number;
  calificacion:number;
  jugadores:number;
  franquicia:string;
  idConsola:number;
  idClasificacion:number;
}

@Component({
  selector: 'app-index-juegos',
  standalone: true,
  imports: [MatTableModule, MatPaginator],
  templateUrl: './index-juegos.component.html',
  styleUrl: './index-juegos.component.css'
})
export class IndexJuegosComponent {
  displayedColumns: string[] = ['idJuego', 'titulo', 'descripcion', 'jugadores', 'nombre', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private juegosServices: JuegosServices,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.getJuegos();
  }


  getJuegos() {
    this.juegosServices.getJuegos().subscribe(data => {
      if (data.code == 100) {
        this.dataSource = new MatTableDataSource(data.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {

      }
    }, (err) => console.error('Failed! ' + err));
  }

  editJuego(id: number): void {
    this.router.navigate(['/juegos/edit'], { queryParams: { id: id } });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteJuegosComponent, {
      width: '450px',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  showJuego(id: number): void {
    const dialogRef = this.dialog.open(ShowJuegosComponent, {
      width: '382px',
      height: '600px',
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
