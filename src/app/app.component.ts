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

  defaultColDef = {
    sortable: true,
    filter: true,
  };
  columnDefs = [{ field: 'make', rowGroup: true }, { field: 'price' }];

  autoGroupColumnDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };

  rowData!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.rowData = this.http.get<any[]>(
      'https://www.ag-grid.com/example-assets/row-data.json'
    );
  }

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => {
      if (node.groupData) {
        return { make: node.key, model: 'Group' };
      }
      return node.data;
    });

    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
