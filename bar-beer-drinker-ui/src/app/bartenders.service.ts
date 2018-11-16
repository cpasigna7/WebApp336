import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bartender {
    Bartendersname: string;
}

@Injectable({
  providedIn: 'root'
})

export class BartendersService {
  constructor(
    public http: HttpClient
  ) { }

  getBartendersFromBars(name: string) {
    return this.http.get<Bartender[]>('/api/bartender/'+ name);
    }
}
