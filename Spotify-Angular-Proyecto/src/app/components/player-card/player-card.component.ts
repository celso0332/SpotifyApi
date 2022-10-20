import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { ICancion } from 'src/app/Interfaces/ICancion';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: ICancion = newMusica();
  subs: Subscription[] = []

  // Icones
  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obtenerCancionActual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obtenerCancionActual(){
    const sub = this.playerService.cancionAtual.subscribe(musica => {
      this.musica = musica;
    });

    this.subs.push(sub);
  }

  regresarCancion(){
    this.playerService.regresarCancion();
  }

  proximaMusica(){
    this.playerService.proximaMusica();
  }

}
