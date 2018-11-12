import { Component, OnInit } from '@angular/core';
import { manfs, ManfsService } from '../manfs.service';

@Component({
  selector: 'app-manf',
  templateUrl: './manf.component.html',
  styleUrls: ['./manf.component.css']
})
export class ManfComponent implements OnInit {

  manfs: manfs[];

  constructor(
    public manfService: ManfsService
  ) { 
  }

  ngOnInit() {
    this.getManfs();
  }
  getManfs() {
    this.manfService.getManfs().subscribe(
      data => {
        this.manfs = data;
      },
      error => {
        alert('Could not retrieve a list of manf');
      }
    )
  }

}
