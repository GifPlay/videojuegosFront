import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Globals} from '../app.global';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JuegosServices {

  constructor(private httpClient: HttpClient,
              private globals: Globals) {
  }

  getJuego(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.httpClient.get(this.globals.url + 'juegos/getJuego', {params: params});
  }

  getJuegoByGenero(id: number): Observable<any> {
    let params = new HttpParams().set('genero', id);
    return this.httpClient.get(this.globals.url + 'juegos/getJuegoByCategoria', {params: params});
  }

  getJuegos(): Observable<any> {
    return this.httpClient.get(this.globals.url + 'juegos');
  }

  updateJuegos(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(model);
    return this.httpClient.put(this.globals.url + 'juegos', body, httpOptions);
  }

  createJuegos(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(model);
    return this.httpClient.post(this.globals.url + 'juegos', body, httpOptions);
  }
  deleteJuegos(id: number): Observable<any> {
    let params = new HttpParams().set("id", id);
    return this.httpClient.delete(this.globals.url + 'juegos', { params: params });
  }
}
