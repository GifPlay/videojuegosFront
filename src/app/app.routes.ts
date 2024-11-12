import { Routes } from '@angular/router';
import {IndexConsolasComponent} from './components/consolas/index-consolas/index-consolas.component';
import {CreateConsolasComponent} from './components/consolas/create-consolas/create-consolas.component';
import {ShowConsolasComponent} from './components/consolas/show-consolas/show-consolas.component';
import {EditConsolasComponent} from './components/consolas/edit-consolas/edit-consolas.component';
import {
  IndexClasificacionComponent
} from './components/clasificacion/index-clasificacion/index-clasificacion.component';
import {
  CreateClasificacionComponent
} from './components/clasificacion/create-clasificacion/create-clasificacion.component';
import {EditClasificacionComponent} from './components/clasificacion/edit-clasificacion/edit-clasificacion.component';
import {IndexGenerosComponent} from './components/generos/index-generos/index-generos.component';
import {CreateGenerosComponent} from './components/generos/create-generos/create-generos.component';
import {EditGenerosComponent} from './components/generos/edit-generos/edit-generos.component';
import {IndexJuegosComponent} from './components/juegos/index-juegos/index-juegos.component';
import {CreateJuegosComponent} from './components/juegos/create-juegos/create-juegos.component';
import {EditJuegosComponent} from './components/juegos/edit-juegos/edit-juegos.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full" },
  {path: "", component: HomeComponent},
  {path: "consolas", component: IndexConsolasComponent},
  {path: "consolas/create", component: CreateConsolasComponent},
  {path: "consolas/show", component: ShowConsolasComponent},
  {path: "consolas/edit", component: EditConsolasComponent},
  {path: "clasificaciones", component: IndexClasificacionComponent},
  {path: "clasificaciones/create", component: CreateClasificacionComponent},
  {path: "clasificaciones/edit", component: EditClasificacionComponent},
  {path: "generos", component: IndexGenerosComponent},
  {path: "generos/create", component: CreateGenerosComponent},
  {path: "generos/edit", component: EditGenerosComponent  },
  {path: "juegos", component: IndexJuegosComponent},
  {path: "juegos/create", component: CreateJuegosComponent},
  {path: "juegos/edit", component: EditJuegosComponent  },
];
