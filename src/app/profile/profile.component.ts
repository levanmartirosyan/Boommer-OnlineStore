import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { EditprofileComponent } from './editprofile/editprofile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, EditprofileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(public apiService: ApiService, public router: Router) {}
  ngOnInit(): void {
    this.getUserProfileData();
  }

  public userProfile: any;

  getUserProfileData() {
    const getToken = sessionStorage.getItem('userToken');
    const storedData = sessionStorage.getItem('userProfileData');
    if (getToken && storedData) {
      this.userProfile = JSON.parse(storedData);
    }
  }
  signOut() {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userRefreshToken');
    sessionStorage.removeItem('userProfileData');
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
