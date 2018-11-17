import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bartender {
    Bartendersname: string;
    Dateday: string;
    start: string;
    end: string;
}

export interface BartenderSales{
  Itemsname: string;
  Sold: number;
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
  
  getBartenderSales(name: string, bartender: string){
    return this.http.get<BartenderSales[]>('api/bartender/'+name+'/'+bartender+'/BartenderSales')
  }
  getBartenderShift(name: string){
    return this.http.get<Bartender[]>('api/bartendershift/'+ name);
  }
}
