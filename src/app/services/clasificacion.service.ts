import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Globals} from '../app.global';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {

  constructor(private httpClient: HttpClient,
              private globals: Globals) {
  }

  getClasificacion(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.httpClient.get(this.globals.url + 'clasificacion/getClasificacion', {params: params});
  }

  getClasificaciones(): Observable<any> {
    return this.httpClient.get(this.globals.url + 'clasificacion');
  }

  updateClasificacion(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(model);
    return this.httpClient.put(this.globals.url + 'clasificacion', body, httpOptions);
  }

  createClasificacion(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(model);
    return this.httpClient.post(this.globals.url + 'clasificacion', body, httpOptions);
  }
  deleteclasificacion(id: number): Observable<any> {
    let params = new HttpParams().set("id", id);
    return this.httpClient.delete(this.globals.url + 'clasificacion', { params: params });
  }
}
