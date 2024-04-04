import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { ApiService } from '../api.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  requestForm: FormGroup;
  serviceTypes = ALL_SERVICE_TYPES;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      unitNumber: ['', Validators.required], 
      serviceType: ['', Validators.required], 
      summary: ['', Validators.required], 
      details: [''] 
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      console.log(this.requestForm.value);
      this.apiService.createMaintenanceRequest(this.requestForm.value).subscribe({
        next: (response: any) => {
          console.log('Request submitted', response);
          alert('Request submitted successfully');
          this.requestForm.reset();
        },
        error: (error) => alert(`Request failed: ${error}`)
      });
    }
  }

}
