import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { ICancion } from 'src/app/Interfaces/ICancion';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musicas: ICancion[] = []
  musicaAtual: ICancion = newMusica();

  subs: Subscription[] = [];

  // IconePlay
  playIcone = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusica()
  }

  obterMusicaAtual(){
    const sub = this.playerService.cancionAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  obtenerArtistas(musica: ICancion){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: ICancion){
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirCancionAtual(musica);
  }
  
}
