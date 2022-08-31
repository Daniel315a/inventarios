import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CotizacionComponent } from "./components/cotizacion/cotizacion.component";
import { FacturaComponent } from "./components/factura/factura.component";
import { ListadoCotizacionesComponent } from "./components/listado-cotizaciones/listado-cotizaciones.component";
import { ListadoFacturasComponent } from "./components/listado-facturas/listado-facturas.component";
import { ListadoPrestamosComponent } from "./components/listado-prestamos/listado-prestamos.component";
import { PersonaComponent } from "./components/persona/persona.component";
import { PrestamoComponent } from "./components/prestamo/prestamo.component";
import { ProductosComponent } from "./components/productos/productos.component";

const routes: Routes = [
    {
        path: '',
        component: ProductosComponent
    },
    {
        path: 'productos',
        component: ProductosComponent
    },
    {
        path: 'personas',
        component: PersonaComponent
    },
    {
        path: 'facturas',
        component: ListadoFacturasComponent
    },
    {
        path: 'factura',
        component: FacturaComponent
    },
    {
        path: 'cotizaciones',
        component: ListadoCotizacionesComponent
    },
    {
        path: 'cotizacion',
        component: CotizacionComponent
    },
    {
        path: 'prestamos',
        component: ListadoPrestamosComponent
    },
    {
        path: 'prestamo',
        component: PrestamoComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }