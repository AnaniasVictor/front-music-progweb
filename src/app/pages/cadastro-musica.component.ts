import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MusicaService, Musica } from '../services/musica.service';

@Component({
  selector: 'app-cadastro-musica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro-musica.component.html'
})
export class CadastroMusicaComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  musicaId?: number;

  constructor(
    private fb: FormBuilder,
    private musicaService: MusicaService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      artista: ['', [Validators.required]],
      album: ['', [Validators.required]],
      dataLancamento: ['', [Validators.required]],
      artistaVivo: [true, [Validators.required]],
      genero: ['', [Validators.required]],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.editando = true;
      this.musicaId = id;
      this.musicaService.buscarPorId(id).subscribe({
        next: (musica) => this.form.patchValue(musica),
        error: () => {
          alert('Erro ao carregar dados da música.');
          this.router.navigate(['/musicas']);
        }
      });
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const musica: Musica = this.form.value;

    const requisicao = this.editando
      ? this.musicaService.atualizar(this.musicaId!, musica)
      : this.musicaService.criar(musica);

    requisicao.subscribe({
      next: () => {
        alert(`Música ${this.editando ? 'atualizada' : 'cadastrada'} com sucesso!`);
        this.router.navigate(['/musicas']);
      },
      error: () => {
        alert('Erro ao salvar a música.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}
