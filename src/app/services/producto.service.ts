import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

//Interface - define la forma del obejto Producto
export interface Producto{
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  categoria?: { id: number; nombre: string }
}

export interface Categoria{
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private urlProductos = `${environment.apiUrl}/productos`;
  private urlCategorias = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  //---Productos----
  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlProductos);
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlProductos}/${id}`);
  }

  buscarPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlProductos}/buscar?nombre=${nombre}`);
  }

  obtenerStockBajo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlProductos}/stock-bajo`);
  }

  guardar(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlProductos, producto);
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.urlProductos}/${id}`, producto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlProductos}/${id}`);
  }

  //---Categorias----
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlCategorias);
  }
}
