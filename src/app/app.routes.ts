import { Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { FormProductoComponent } from './components/form-producto/form-producto.component';
import { StockBajoComponent } from './components/stock-bajo/stock-bajo.component';

export const routes: Routes = [
  {path:'', redirectTo: 'productos', pathMatch: 'full'},
  {path:'productos', component: ListaProductosComponent},
  {path: 'productos/nuevo', component: FormProductoComponent},
  {path: 'productos/editar/:id', component: FormProductoComponent},
  {path: 'stock-bajo', component: StockBajoComponent},
];
