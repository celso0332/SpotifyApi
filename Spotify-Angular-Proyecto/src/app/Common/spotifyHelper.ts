import { addMilliseconds, format } from "date-fns";
import { IArtista } from "../Interfaces/IArtista";
import { ICancion } from "../Interfaces/ICancion";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IUsuario } from "../Interfaces/IUsuario";
import { newMusica, newPlaylist } from "./factories";






export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
   return {
     id: user.id,
     name: user.display_name,
     imagenUrl: user.images.pop().url
   }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
  return {
    id: playlist.id,
    name: playlist.name,
    imagenUrl: playlist.images.pop().url
  };
}

export function SpotifySinglePlaylistParaPlaylist(playlist: SpotifyApi.SinglePlaylistResponse ): IPlaylist {
  if (!playlist)
    return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    imagenUrl: playlist.images.shift().url,
    musica: []
  }

}

export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull) :  IArtista{
  return {
    id: spotifyArtista.id,
    imageUrl: spotifyArtista.images.sort((a,b) => a.width - b.width).pop().url,
    name: spotifyArtista.name
  };
}

export function SpotifyTrackParaCancion(spotifyTrack: SpotifyApi.TrackObjectFull) : ICancion{
  
  if (!spotifyTrack)
    return newMusica();

  const msParaMinutos = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }
  
  return {
    id: spotifyTrack.uri,
    titulo: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      portadaUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name
    },
    artistas: spotifyTrack.artists.map(artista => ({
      id: artista.id,
      nome: artista.name
    })),
    tempo: msParaMinutos(spotifyTrack.duration_ms),
  }
}