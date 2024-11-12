import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Globals} from '../app.global';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private httpClient: HttpClient,
              private globals: Globals) {
  }

  getGenero(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.httpClient.get(this.globals.url + 'genero/getGenero', {params: params});
  }

  getGeneros(): Observable<any> {
    return this.httpClient.get(this.globals.url + 'genero');
  }

  updateGenero(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(model);
    return this.httpClient.put(this.globals.url + 'genero', body, httpOptions);
  }

  createGenero(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(model);
    return this.httpClient.post(this.globals.url + 'genero', body, httpOptions);
  }
  deleteGenero(id: number): Observable<any> {
    let params = new HttpParams().set("id", id);
    return this.httpClient.delete(this.globals.url + 'genero', { params: params });
  }
}
