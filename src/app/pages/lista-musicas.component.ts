import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MusicaService, Musica } from '../services/musica.service';

@Component({
  selector: 'app-lista-musicas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-musicas.component.html',
})
export class ListaMusicasComponent implements OnInit {
  musicas: Musica[] = [];
  carregando = true;
  erro = false;

  constructor(
    private musicaService: MusicaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarMusicas();
  }

  buscarMusicas(): void {
    this.carregando = true;
    this.erro = false;

    this.musicaService.listar().subscribe({
      next: (musicas) => {
        this.musicas = musicas;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar músicas:', err);
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  editarMusica(id: number): void {
    this.router.navigate(['/cadastro', id]);
  }

  excluirMusica(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta música?')) {
      this.musicaService.deletar(id).subscribe(() => {
        alert('Música excluída com sucesso!');
        this.buscarMusicas();
      });
    }
  }

  cadastrarNova(): void {
    this.router.navigate(['/cadastro']);
  }

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }
}
