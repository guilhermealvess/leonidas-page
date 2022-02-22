import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticatorService {

  private url = '';
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  private readonly CURRENT_USER_KEY = 'currentUser';
  // Mocky
  private readonly API = 'https://run.mocky.io/v3/b633590f-ab89-453f-8def-aff87034a856';

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY) || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: String, password: String): void {
    this.httpClient.post<User>(this.API, {username: username, password: password})
    .subscribe( (user: User) => {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(new User);
  }
}
