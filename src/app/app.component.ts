import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ag-grid-app';
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  columnDefs = [
    { field: 'make', sortable: true, filter: true, checkboxSelection: true },
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

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model} ${node.price}`)
      .join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
