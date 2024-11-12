import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ConsolaService} from '../../../services/consola.services';
import {ToasterService} from '../../../services/toaster.service';
import {JuegosServices} from '../../../services/juegos.services';
import {formatNumber, NgForOf} from '@angular/common';
import {GeneroService} from '../../../services/genero.service';

@Component({
  selector: 'app-show-juegos',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './show-juegos.component.html',
  styleUrl: './show-juegos.component.css'
})
export class ShowJuegosComponent {

  empresa: any;
  lanzamiento: any;
  nombre: any;
  titulo: any;
  descripcion: any;
  calificacion: any;
  anio: any;
  jugadores: any;
  franquicia: any;
  genero: any;
  clasificacion: any;
  consola: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ShowJuegosComponent>,
    public juegosServices: JuegosServices,
    public consolaService: ConsolaService,
    public generoService: GeneroService,
    public toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public juego:any
  ) { }

  ngOnInit(): void {
    this.getJuego();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCalificacionArray(): any[] {
    return Array(this.calificacion).fill(0);
  }
  getUnsetCalificacion(): any[]{
    return Array(10 - this.calificacion).fill(0);
  }

  getConsola(consola: number): any {
    this.consolaService.getConsola(consola).subscribe(data => {
      if (data.code == 100) {
        this.consola = data.result['nombre'];
      }
    }, (err) => console.error('Failed! ' + err));
  }
  getGenero(genero: number): any {
    this.generoService.getGenero(genero).subscribe(data => {
      if (data.code == 100) {
        this.genero = data.result['nombre'];
      }
    }, (err) => console.error('Failed! ' + err));
  }

  getJuego(){
    this.juegosServices.getJuego(this.juego.id).subscribe(data => {
      if (data.code == 100) {
        console.log(data.result);
        this.titulo = data.result['titulo'];
        this.descripcion = data.result['descripcion'];
        this.calificacion = data.result['calificacion'];
        this.anio = data.result['anio'];
        this.jugadores = data.result['jugadores'];
        this.franquicia = data.result['franquicia'];
        this.getConsola(data.result['idConsola'])
        this.getGenero(data.result['idGenero'])
      }
    }, (err) => console.error('Failed! ' + err));
  }

  protected readonly formatNumber = formatNumber;
}
