import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Musica {
  id?: number;
  titulo: string;
  artista: string;
  album: string;
  dataLancamento: string;
  artistaVivo: boolean;
  genero: string;
}

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private baseUrl = 'http://localhost:8080/api/musicas';

  constructor(private http: HttpClient) { }

  listar(): Observable<Musica[]> {
    return this.http.get<Musica[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Musica> {
    return this.http.get<Musica>(`${this.baseUrl}/${id}`);
  }

  criar(musica: Musica): Observable<Musica> {
    return this.http.post<Musica>(this.baseUrl, musica);
  }

  atualizar(id: number, musica: Musica): Observable<Musica> {
    return this.http.put<Musica>(`${this.baseUrl}/${id}`, musica);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
