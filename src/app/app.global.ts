import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Globals {

  url: string = 'https://localhost:44318/api/';
  urlImage: string = 'https://localhost:44318/';
  appName: string = 'VideojuegosTest';
}
