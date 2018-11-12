import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface manfs {
  manf: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManfsService {

  constructor(
    public http: HttpClient
  ) { }

  getManfs() {
    return this.http.get<manfs[]>('/api/manf');
  }

  getManf(manf: string){
    return this.http.get<manfs>('api/manf/' + manf);
  }
}