export interface ICancion {
  id: string,
  titulo: string,
  artistas: {
    id: string,
    nome: string
  }[],
  album: {
    id: string,
    name: string,
    portadaUrl: string
  },
  tempo: string
}