import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';

import { ListaMusicasComponent } from './pages/lista-musicas.component';
import { CadastroMusicaComponent } from './pages/cadastro-musica.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cadastro', component: CadastroMusicaComponent },
    { path: 'cadastro/:id', component: CadastroMusicaComponent }, // para editar
    { path: 'musicas', component: ListaMusicasComponent }
];
