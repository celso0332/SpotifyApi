import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { ICancion } from 'src/app/Interfaces/ICancion';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica.component.scss']
})
export class ListaMusicaComponent implements OnInit, OnDestroy {

  bannerImagemUrl = ''; 
  bannerTexto = '';

  musicas: ICancion[] = [];
  cancionAtual: ICancion = newMusica();
  playIcone = faPlay;

  title = '';

  subs: Subscription[] = []

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
    ) { }

  ngOnInit(): void {
    this.obtenerCanciones();
    this.obtenerCancionAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());  
  }

  obtenerCancionAtual(){
    const sub = this.playerService.cancionAtual.subscribe(musica => {
      this.cancionAtual = musica;
    });

    this.subs.push(sub);
  }

  obtenerCanciones(){
    const sub = this.activedRoute.paramMap
      .subscribe(async params => {
        const tipo = params.get('tipo');
        const id = params.get('id');
        await this.obtenerDatosDePagina(tipo, id);
      });
    
    this.subs.push(sub);
  }

  async obtenerDatosDePagina(tipo: string, id: string){
    if(tipo === 'playlist')
      await this.obterDadosPlaylist(id);
    else
      await this.obterDadosArtista(id);
  }

  async obterDadosPlaylist(playlistId: string){
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosPagina(playlistMusicas.name, playlistMusicas.imagenUrl, playlistMusicas.musica);
    this.title = 'Musicas Playlist: ' + playlistMusicas.name;
  }

  async obterDadosArtista(artistaId: string){

  }

  definirDadosPagina(bannerTexto: string, bannerImage: string, musicas: ICancion[]){
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  obterArtistas(musica: ICancion){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: ICancion){
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirCancionAtual(musica);
  }

}
