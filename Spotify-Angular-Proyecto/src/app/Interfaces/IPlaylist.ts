import { ICancion } from "./ICancion";

export interface IPlaylist {
  id: string,
  name: string,
  imagenUrl: string,
  musica?: ICancion[]
}