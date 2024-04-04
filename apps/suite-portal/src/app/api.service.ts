import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  apiURL: string = 'http://localhost:3333/api';

  createMaintenanceRequest(request: any) {
    return this.http.post(`${this.apiURL}/maintenance-requests`, request);
  }

  login(data: any) {
    return this.http.post(`${this.apiURL}/user-requests/login-admin`, data);
  }

  listAllMaintaineceRequests() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(`${this.apiURL}/maintenance-requests`, { headers });
  }

  closeMaintaineceRequest(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put(
      `${this.apiURL}/maintenance-requests/${id}/close`,
      {},
      { headers }
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user;
  }
}
