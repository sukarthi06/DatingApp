import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, Home]
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = 'Dating App';//signal('Dating App');
  protected members = signal<User[]>([]);
  
  constructor(){}

  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();

    // this.http.get('http://localhost:5126/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.log(error),
    //   complete: () => console.log('Completed the http request')
    // });
  }

  setCurrentUser(){
    const userString = localStorage.getItem('DAppUser');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get<User[]>('http://localhost:5126/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
