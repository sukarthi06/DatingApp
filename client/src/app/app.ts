import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = 'Dating App';//signal('Dating App');
  protected members = signal<any>([]);
  
  constructor(){}

  async ngOnInit() {
    this.members.set(await this.getMembers());
    // this.http.get('http://localhost:5126/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.log(error),
    //   complete: () => console.log('Completed the http request')
    // });
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get('http://localhost:5126/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
