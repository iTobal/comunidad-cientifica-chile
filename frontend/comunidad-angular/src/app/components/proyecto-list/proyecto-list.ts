import { Component } from '@angular/core';

import { Proyecto } from '../../models/proyecto.model';
import { ProyectoCard } from '../proyecto-card/proyecto-card';

@Component({
  selector: 'app-proyecto-list',
  standalone: true,
  imports: [ProyectoCard],
  templateUrl: './proyecto-list.html',
  styleUrl: './proyecto-list.scss'
})
export class ProyectoList {
  proyectos: Proyecto[] = [
    {
      id: 1,
      titulo: 'Monitoreo de biodiversidad en humedales de Chile',
      area_cientifica: 'Biología y Medioambiente',
      estado: 'En ejecución',
      investigador_responsable: 'Dra. Valentina Rojas',
      cantidad_publicaciones: 1
    },
    {
      id: 2,
      titulo: 'Divulgación científica para comunidades escolares',
      area_cientifica: 'Educación Científica',
      estado: 'Planificado',
      investigador_responsable: 'Dr. Sebastián Morales',
      cantidad_publicaciones: 0
    }
  ];

  proyectoSeleccionadoId: number | null = null;

  seleccionarProyecto(id: number): void {
  if (this.proyectoSeleccionadoId === id) {
    this.proyectoSeleccionadoId = null;
    return;
  }

  this.proyectoSeleccionadoId = id;
  }


  get proyectoSeleccionado(): Proyecto | null {
    return (
      this.proyectos.find(
        proyecto => proyecto.id === this.proyectoSeleccionadoId
      ) ?? null
    );
  }
}
