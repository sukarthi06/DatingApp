import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from "../layout/nav/nav";

@Component({
  selector: 'app-root',  
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, RouterOutlet]
})
export class App {
  
  protected router = inject(Router);
  
  constructor(){}

  // this.http.get('http://localhost:5126/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.log(error),
    //   complete: () => console.log('Completed the http request')
    // });
}
