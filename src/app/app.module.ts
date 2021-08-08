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
import { ListadoFacturasComponent } from './component/listado-facturas/listado-facturas.component';

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
    ListadoFacturasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }