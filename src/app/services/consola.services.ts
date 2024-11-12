import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Globals} from '../app.global';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsolaService {

  constructor(private httpClient: HttpClient,
              private globals: Globals) {
  }

  getConsola(id: number): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.httpClient.get(this.globals.url + 'consolas/getConsola', {params: params});
  }

  getConsolas(): Observable<any> {
    return this.httpClient.get(this.globals.url + 'consolas');
  }

  updateConsola(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(model);
    return this.httpClient.put(this.globals.url + 'consolas', body, httpOptions);
  }

  createConsola(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const body = JSON.stringify(model);
    return this.httpClient.post(this.globals.url + 'consolas', body, httpOptions);
  }
  deleteConsola(id: number): Observable<any> {
    let params = new HttpParams().set("id", id);
    return this.httpClient.delete(this.globals.url + 'consolas', { params: params });
  }
}
