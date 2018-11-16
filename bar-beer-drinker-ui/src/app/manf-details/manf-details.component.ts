import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ManfsService, manfs } from '../manfs.service';

@Component({
  selector: 'app-manf-details',
  templateUrl: './manf-details.component.html',
  styleUrls: ['./manf-details.component.css']
})
export class ManfDetailsComponent implements OnInit {
  manfName: string;
  manfDetails: manfs;

constructor(
    private manfService: ManfsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.manfName = paramMap.get('manf');
      manfService.getManf(this.manfName).subscribe(
        data => {
          this.manfDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Manufacturer not found')
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occured on the server. Please check the browser console.');
          }
        }
      );
    });
  }
  ngOnInit() {
  }
}
