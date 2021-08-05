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
import { SelectTipoPersonaComponent } from './components/select-tipo-persona/select-tipo-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PersonasComponent,
    SelectDepartamentosComponent,
    SelectMunicipiosComponent,
    PersonaComponent,
    SelectTipoPersonaComponent
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