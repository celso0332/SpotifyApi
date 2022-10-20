import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newMusica } from '../Common/factories';
import { ICancion } from '../Interfaces/ICancion';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  cancionAtual = new BehaviorSubject<ICancion>(newMusica());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obtenerCancionAtual();
  }

  async obtenerCancionAtual(){
    clearTimeout(this.timerId);


    const musica = await this.spotifyService.obtenerCancionAtual();
    this.definirCancionAtual(musica);

    this.timerId = setInterval(async () => {
      await this.obtenerCancionAtual();
    }, 5000)
  }

  definirCancionAtual(musica: ICancion){
    this.cancionAtual.next(musica);
  }

  async regresarCancion(){
    await this.spotifyService.regresarCancion();
  }

  async proximaMusica() {
    await this.spotifyService.siguienteCancion();
  }
}
