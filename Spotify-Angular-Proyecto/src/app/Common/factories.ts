import { IArtista } from "../Interfaces/IArtista";
import { ICancion } from "../Interfaces/ICancion";
import { IPlaylist } from "../Interfaces/IPlaylist";

export function newArtista(): IArtista {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musica: []
  };
}

export function newMusica(): ICancion {
  return {
    id: '',
    album: {
      id: '',
      portadaUrl: '',
      name: '',
    },
    artistas: [],
    tempo: '',
    titulo: ''
  }
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imagenUrl: '',
    name: '',
    musica: []
  }
}