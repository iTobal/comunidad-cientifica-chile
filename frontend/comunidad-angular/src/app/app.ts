import { Component } from '@angular/core';
import { ProyectoList } from './components/proyecto-list/proyecto-list';

@Component({
  selector: 'app-root',
  imports: [ProyectoList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
