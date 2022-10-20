import { ICancion } from "./ICancion";

export interface IArtista {
  id: string,
  name: string,
  imageUrl: string,
  musica?: ICancion[]
}