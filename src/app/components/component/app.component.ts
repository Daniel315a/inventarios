import { Component, OnInit } from '@angular/core';
import { Utilidades } from 'src/app/models/utilidades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public loginOk: boolean = false;

  ngOnInit(): void {
    this.loginOk = Utilidades.verificarLogin();
    Utilidades.appMovil = window.innerWidth <= 600;
  }

}