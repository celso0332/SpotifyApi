import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busquedas-recientes',
  templateUrl: './busquedas-recientes.component.html',
  styleUrls: ['./busquedas-recientes.component.scss']
})
export class BusquedasRecientesComponent implements OnInit {

  Recientes = [
    'Top Mexico', 'Top Global',
    'Funk Hits'
  ]

  busqueda = '';

  constructor() { }

  ngOnInit(): void {
  }

  busquedas(pesquisa: string){
    this.busqueda = pesquisa;
  }

  buscar(){
    console.log('Buscando...', this.busqueda);
  }

}
