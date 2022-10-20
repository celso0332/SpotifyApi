export const environment = {
  production: true
};


export const SpotifyConfiguration = {
  clientId: 'cd0258721b0443f1a44cb62735e38089',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login/',
  scopes: [
    "user-read-currently-playing", // cancion play.
    "user-read-recently-played", // cancion escuchada recientemente
    "user-read-playback-state", // lector del estado de la reproduccion
    "user-top-read", // top artistas y canciones
    "user-modify-playback-state", // modificar el estado de la reproduccion
    "user-library-read", // leer bibliotecas
    "playlist-read-private", // leer playlists del usuario privadas
    "playlist-read-collaborative" // leer playlists colaborativas
  ]
}