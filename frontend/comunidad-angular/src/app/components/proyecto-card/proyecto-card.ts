import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Proyecto } from '../../models/proyecto.model';

@Component({
  selector: 'app-proyecto-card',
  standalone: true,
  imports: [],
  templateUrl: './proyecto-card.html',
  styleUrl: './proyecto-card.scss'
})
export class ProyectoCard {
  @Input({ required: true }) proyecto!: Proyecto;
  @Input() seleccionado = false;

  @Output() seleccionar = new EventEmitter<number>();

  seleccionarProyecto(): void {
    this.seleccionar.emit(this.proyecto.id);
  }
}
