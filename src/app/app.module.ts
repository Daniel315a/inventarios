import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/component/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonasComponent } from './components/personas/personas.component';
import { SelectDepartamentosComponent } from './components/select-departamentos/select-departamentos.component';
import { SelectMunicipiosComponent } from './components/select-municipios/select-municipios.component';
import { PersonaComponent } from './components/persona/persona.component';
import { SelectTiposPersonaComponent } from './components/select-tipos-persona/select-tipos-persona.component';
import { SelectTiposDocumentoComponent } from './components/select-tipos-documento/select-tipos-documento.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ListadoFacturasComponent } from './components/listado-facturas/listado-facturas.component';
import { FacturaComponent } from './components/factura/factura.component';
import { TxtPersonaComponent } from './components/txt-persona/txt-persona.component';
import { SelectProductosComponent } from './components/select-productos/select-productos.component';
import { AppRoutingModule } from './app-routing.module';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
import { ListadoCotizacionesComponent } from './components/listado-cotizaciones/listado-cotizaciones.component';
import { ListadoPrestamosComponent } from './components/listado-prestamos/listado-prestamos.component';
import { FiltroFacturasPipePipe } from './pipes/filtro-facturas-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PersonasComponent,
    SelectDepartamentosComponent,
    SelectMunicipiosComponent,
    PersonaComponent,
    SelectTiposPersonaComponent,
    SelectTiposDocumentoComponent,
    ProductosComponent,
    ListadoFacturasComponent,
    FacturaComponent,
    TxtPersonaComponent,
    SelectProductosComponent,
    CotizacionesComponent,
    PrestamosComponent,
    CotizacionComponent,
    PrestamoComponent,
    ListadoCotizacionesComponent,
    ListadoPrestamosComponent,
    FiltroFacturasPipePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }