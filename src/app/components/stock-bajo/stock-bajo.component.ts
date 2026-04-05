import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-bajo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-bajo.component.html',
  styleUrl: './stock-bajo.component.css'
})
export class StockBajoComponent implements OnInit {

  productos: Producto[] = []; // Aquí se almacenarán los productos con stock bajo
  cargando: boolean = false; // Para mostrar un mensaje de "cargando" mientras se obtienen los productos

  constructor(
    private productoService: ProductoService, // Inyectamos el servicio para obtener los productos
    private router: Router // Para navegar a la página de edición del producto
  ) { }

  ngOnInit(): void {
    this.cargarStockBajo(); // Cargar los productos con stock bajo al iniciar el componente
  }

  cargarStockBajo(): void {
    this.cargando = true; // Mostrar mensaje de "cargando"
    this.productoService.obtenerStockBajo().subscribe({
      next: (datos) => {
        this.productos = datos; // Guardar los productos obtenidos del servicio
        this.cargando = false; // Ocultar mensaje de "cargando"
      },
      error: (err) => {
        console.error(err);
        this.cargando = false; // Ocultar mensaje de "cargando" incluso si hay un error
      }
    });
  }

  //Calcula cuantas unidades faltan para llegar al stock mínimo
  diferencia(producto: Producto): number{
    return producto.stock - producto.stockMinimo
  }

  irAEditar(id: number): void {
    this.router.navigate(['/productos/editar',id]);
  }
}
