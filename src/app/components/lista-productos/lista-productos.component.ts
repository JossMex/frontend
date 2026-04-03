import { ProductoService } from './../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../services/producto.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = []; //lista completa
  terminoBusqueda: string = ''; //lo que escribe el usuario
  cargando: boolean = false; //para mostrar un mensaje de "cargando" mientras se buscan los productos
  mensaje: string = ''; //mensajes de éxito o error

  constructor(private productoService: ProductoService, private router: Router) { }

  // se ejecuta automaticamente al cargar el componente
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true; //mostrar mensaje de "cargando"
    this.productoService.obtenerTodos().subscribe({
      next: (datos) => {
        this.productos = datos; //guarada los productos obtenidos del servicio
        this.cargando = false; //ocultar mensaje de "cargando"
      },
      error: (err) => {
        this.mensaje = 'Error al cargar productos';
        this.cargando = false; //ocultar mensaje de "cargando"
        console.error(err);
      }
    });
  }

  buscar(): void {
    if (this.terminoBusqueda.trim() === '') {
      //si el buscador está vacío, cargar todos los productos
      this.cargarProductos();
      return;
    }

    this.productoService.buscarPorNombre(this.terminoBusqueda).subscribe({
      next: (datos) => this.productos = datos, //actualiza la lista de productos con los resultados de la búsqueda
      error: (err) => console.error(err)
    });
  }

  eliminar(id: number): void {
    //confirmacion antes de eliminar
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    this.productoService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Producto eliminado exitosamente';
        this.cargarProductos(); //recarga la lista de productos después de eliminar
      },
      error: (err) => {
        this.mensaje = 'Error al eliminar producto';
        console.error(err);
      }
    });
  }

  //Detecta si el stock esta bajo
  stockBajo(producto: Producto): boolean {
    return producto.stock < producto.stockMinimo;
  }


//Navega a la página de creación de nuevo producto
irANuevo(): void {
  this.router.navigate(['/productos/nuevo']);
}

irAEditar(id: number): void {
  this.router.navigate(['/productos/editar', id]);
}

}
