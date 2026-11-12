import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Proyecto } from '../../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/proyectos/';

  constructor(private http: HttpClient) {}

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }
}
