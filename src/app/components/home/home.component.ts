import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToasterService} from '../../services/toaster.service';
import {GeneroService} from '../../services/genero.service';
import {MatDialog} from '@angular/material/dialog';
import {NgSelectOption} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {JuegosServices} from '../../services/juegos.services';

interface generos{
  value: number;
  ngValue: string;
  peliculas: []
}
interface juegosByGenero{
  idPelicula: number,
  titulo: string,
  descripcion: string,
  anio: number,
  calificacion: string,
  jugadores: number,
  franquicia: string,
  nombre: string,
  empresa: string,
  clasificacion: string


}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  displayedColumns: string[] = ['idGenero', 'nombre','descripcion', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  propertyGeneros: { value: number; ngValue: string; peliculas: [] }[] = [];
  //propertyPeliculas: { idPelicula: number; titulo: string; descripcion: string; anio: number; calificacion: number; jugadores: number; franquicia: string; nombre: string; empresa: string;clasificacion: string; }[] = [];
  propertyPeliculas: any[] = [];
  juegosGenero: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toasterService: ToasterService,
    private generoService: GeneroService,
    private juegosServices: JuegosServices,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getGeneros();
  }

  getJuegos(id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.juegosServices.getJuegoByGenero(id).subscribe(
        data => {
          if (data.code === 100) {
            resolve(data.result);
          } else {
            reject('Código de respuesta no es 100');
          }
        },
        err => reject('Failed! ' + err)
      );
    });
  }

  getCalificacionArray(cal: number): any[] {
    return Array(cal).fill(0);
  }
  getUnsetCalificacion(cal: number): any[]{
    return Array(10 - cal).fill(0);
  }


  getGeneros() {
    this.generoService.getGeneros().subscribe(
      async data => {
        if (data.code === 100) {
          const generos = data.result;
          this.propertyGeneros = await Promise.all(
            generos.map(async (genero: any) => {
              const juegosGenero = await this.getJuegos(genero.idGenero);
              return {
                value: genero.idGenero,
                ngValue: genero.nombre,
                peliculas: juegosGenero
              };
            })
          );
          console.log(this.propertyGeneros);
        } else {

        }
      },
      err => console.error('Failed! ' + err)
    );
  }
}
