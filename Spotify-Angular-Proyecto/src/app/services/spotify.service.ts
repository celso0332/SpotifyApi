import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../Interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist, SpotifyTrackParaCancion, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../Interfaces/IArtista';
import { ICancion } from '../Interfaces/ICancion';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.definirAccessToken(token);
      await this.obtenerSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obtenerSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  obtenerUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType; 
  }

  obtenerTokenUrlCallback() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify)
      return null;
    
    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.musica = musicasSpotify.items.map(musica => SpotifyTrackParaCancion(musica.track as SpotifyApi.TrackObjectFull))
    
    return playlist;
  }



  async buscarTopArtistas(limit = 10):Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    console.log(artistas)
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusica(offset=0, limit=50): Promise<ICancion[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map(x => SpotifyTrackParaCancion(x.track));
  }

  async executarMusica(musicaId: string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obtenerCancionAtual(): Promise<ICancion>{
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    console.log(musicaSpotify)
    return SpotifyTrackParaCancion(musicaSpotify.item);
  }

  async regresarCancion(){

    await this.spotifyApi.skipToPrevious();
  }

  async siguienteCancion() {
    await this.spotifyApi.play;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
