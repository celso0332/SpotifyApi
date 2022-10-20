import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boton-menu',
  templateUrl: './boton-menu.component.html',
  styleUrls: ['./boton-menu.component.scss']
})
export class BotonMenuComponent implements OnInit {

  @Input()
  descripcion = '';

  @Input()
  selecionado = false; 

  @Output()
  click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }

}
