import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './navigation/search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/edit-profile', component: EditprofileComponent },
  { path: '**', component: NotfoundComponent },
];
