import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ag-grid-app';

  columnDefs = [
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
  ];

  rowData!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.rowData = this.http.get<any[]>(
      'https://www.ag-grid.com/example-assets/small-row-data.json'
    );
  }
}
