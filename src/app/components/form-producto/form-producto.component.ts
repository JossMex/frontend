import { Categoria, Producto } from './../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent implements OnInit {

  //Objeto producto que se llama con el formulario
  Producto: Producto = {
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  stockMinimo: 5,
  categoria: undefined
  };

  categorias: Categoria[]=[]; //lita para el select
  modoEditar: boolean = false; // estamos editando o creando?
  idProducto: number | null = null;
  guardando: boolean = false; //Para desactivar el botón mientras se guarda
  errores: string[] = []; //Lista de errores de validación

  constructor(
    private productoService: ProductoService, //Inyectamos el servicio
    private route: ActivatedRoute, //Para obtener el id de la ruta
    private router: Router //Para navegar después de guardar
  ) {}

  ngOnInit(): void {
    //Cargar categorias para el select
    this.productoService.obtenerCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error(err)
    });

    //Leer el ID de la URL -> /producto/editar/5
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      //Modo edición
      this.modoEditar = true;
      this.idProducto = Number(id);
      this.cargarProducto(this.idProducto);
    }
  }

  cargarProducto(id: number): void {
    this.productoService.obtenerPorId(id).subscribe({
      next: (data) => {
        this.Producto = data;
      },
      error: (err) => console.error(err)
    });
  }

  validar(): boolean {
    this.errores = []; //Limpiar errores anteriores

    if(!this.Producto.nombre.trim()){
      this.errores.push('El nombre es obligatorio.');
    }

    if(this.Producto.precio <= 0){
      this.errores.push('El precio debe ser mayor a cero.');
    }

    if(this.Producto.stock < 0){
      this.errores.push('El stock no puede ser negativo.');
    }

    if(this.Producto.stockMinimo < 0){
      this.errores.push('El stock mínimo no puede ser negativo.');
    }

    return this.errores.length === 0; //True si no hay errores
  }

  guardar(): void {
    //Validar antes de guardar
    if(!this.validar()){
      return; //Si hay errores, no guardar
    }
    this.guardando = true; //Desactivar botón

    if(this.modoEditar && this.idProducto !== null){
      //Actualizar producto
      this.productoService.actualizar(this.idProducto, this.Producto).subscribe({
        next: () => {
          this.router.navigate(['/productos']); //Regresar a la lista
    },
        error: (err) => {
          this.errores.push('Error al actualizar el producto.');
          this.guardando = false; //Reactivar botón
          console.error(err);
        }
      });
    } else {
      //Crear nuevo producto
      this.productoService.guardar(this.Producto).subscribe({
        next:() => {
          this.router.navigate(['/productos']); //Regresar a la lista
        },
        error: (err) => {
          this.errores.push('Error al guardar el producto.');
          this.guardando = false; //Reactivar botón
          console.error(err);
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/productos']); //Regresar a la lista
  }

}
