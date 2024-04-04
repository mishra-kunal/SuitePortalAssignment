import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'sp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'unitNumber',
    'serviceType',
    'summary',
    'action',
  ];

  cdisplayedColumns: string[] = [
    'name',
    'email',
    'unitNumber',
    'serviceType',
    'summary',
  ];

  // Directly defining the dummy data without an interface
  MAINTENANCE_DATA = [];
  CLOSED_MAINTENANCE_DATA = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetching the list of maintenance requests
    this.apiService.listAllMaintaineceRequests().subscribe({
      next: (response: any) => {
        console.log('Maintenance requests:', response);
        // Dont add maintenance requests which is already closed
        this.MAINTENANCE_DATA = response.filter(
          (request: any) => !request.isClosed
        );
        this.CLOSED_MAINTENANCE_DATA = response.filter(
          (request: any) => request.isClosed
        );
      },
      error: (error) => alert(`Failed to fetch maintenance requests: ${error}`),
    });
  }

  closeRequest(id: string) {
    console.log(`Closing request with ID: ${id}`);
    this.apiService.closeMaintaineceRequest(id).subscribe({
      next: (response: any) => {
        console.log('Request closed:', response);
        // Refresh the list of maintenance requests
        this.ngOnInit();
      },
      error: (error) => alert(`Failed to close request: ${error}`),
    });
  }
}
