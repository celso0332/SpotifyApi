import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { PanelIzquerdoComponent } from 'src/app/components/panel-izquierdo/panel-izquerdo.component';
import { BotonMenuComponent } from 'src/app/components/boton-menu/boton-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeUsuarioComponent } from 'src/app/components/rodape-usuario/rodape-usuario.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistaComponent } from 'src/app/components/top-artista/top-artista.component';
import { PanelDerechoComponent } from 'src/app/components/panel-derecho/panel-derecho.component';
import { BusquedasRecientesComponent } from 'src/app/components/busquedas-recientes/busquedas-recientes.component';
import { FormsModule } from '@angular/forms';
import { TopArtistasComponent } from 'src/app/components/top-artistas/top-artistas.component';
import { ArtistaItemImagemComponent } from 'src/app/components/artista-item-imagem/artista-item-imagem.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { ListaMusicaComponent } from '../lista-musica/lista-musica.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@NgModule({
  declarations: [
    PlayerComponent,
    ListaMusicaComponent,
    PanelIzquerdoComponent,
    BotonMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    PanelDerechoComponent,
    BusquedasRecientesComponent,
    TopArtistasComponent,
    ArtistaItemImagemComponent,
    PlayerCardComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas),
  ]
})
export class PlayerModule { }
